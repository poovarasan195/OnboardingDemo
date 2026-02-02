import { useCallback, useEffect, useRef, useState } from 'react';

export const useCounterAnimation = ({
  targetNumber,
  durationSec,
  easing,
  onComplete,
}) => {
  const [value, setValue] = useState(0);
  const [state, setState] = useState('idle');
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const resumeProgressRef = useRef(0);
  const targetRef = useRef(targetNumber);
  const durationRef = useRef(Math.max(durationSec, 0.1));

  useEffect(() => {
    targetRef.current = Number.isFinite(targetNumber) ? targetNumber : 0;
    durationRef.current = Math.max(durationSec, 0.1);
  }, [targetNumber, durationSec]);

  const cancel = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = useCallback(
    (timestamp) => {
      if (startTimeRef.current === null) {
        const durationMs = durationRef.current * 1000;
        startTimeRef.current = timestamp - resumeProgressRef.current * durationMs;
      }
      const elapsedMs = timestamp - startTimeRef.current;
      const durationMs = durationRef.current * 1000;
      const progress = Math.min(elapsedMs / durationMs, 1);
      const eased = easing ? easing(progress) : progress;
      const nextValue = Math.round(targetRef.current * eased);

      setValue(nextValue);

      if (progress >= 1) {
        setState('completed');
        cancel();
        onComplete?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [easing, onComplete],
  );

  const start = useCallback(() => {
    if (state === 'running') {
      return;
    }
    if (state === 'completed') {
      setValue(0);
    }
    const target = targetRef.current || 0;
    resumeProgressRef.current = target > 0 ? value / target : 0;
    setState('running');
    startTimeRef.current = null;
    cancel();
    rafRef.current = requestAnimationFrame(tick);
  }, [state, tick, value]);

  const stop = useCallback(() => {
    if (state !== 'running') {
      return;
    }
    setState('paused');
    cancel();
  }, [state, value]);

  const reset = useCallback(() => {
    setState('idle');
    setValue(0);
    startTimeRef.current = null;
    resumeProgressRef.current = 0;
    cancel();
  }, []);

  const restart = useCallback(() => {
    reset();
    setState('running');
    rafRef.current = requestAnimationFrame(tick);
  }, [reset, tick]);

  useEffect(() => () => cancel(), []);

  return {
    value,
    state,
    start,
    stop,
    reset,
    restart,
  };
};
