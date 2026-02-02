import { Text, TouchableOpacity, View } from 'react-native';
import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import { styles } from './CounterTimer.styles';

export const CounterTimer = ({
  targetNumber,
  durationSec,
  onComplete,
  format,
  easing,
}) => {
  const { value, state, start, stop, reset, restart } = useCounterAnimation({
    targetNumber,
    durationSec,
    onComplete,
    easing,
  });

  const displayValue = format ? format(value) : `${value}/${targetNumber}`;
  const statusLabel =
    state === 'running'
      ? 'Running'
      : state === 'paused'
        ? 'Paused'
        : state === 'completed'
          ? 'Completed'
          : 'Idle';

  return (
    <View style={styles.card}>
      <View style={styles.counterPill}>
        <Text style={styles.counterText}>🎯 {displayValue}</Text>
      </View>
      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={start}>
          <Text style={styles.controlText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonSecondary]}
          onPress={stop}
        >
          <Text style={styles.controlText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonOutline]}
          onPress={reset}
        >
          <Text style={[styles.controlText, styles.controlTextOutline]}>
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonOutline]}
          onPress={restart}
        >
          <Text style={[styles.controlText, styles.controlTextOutline]}>↻</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>
    </View>
  );
};
