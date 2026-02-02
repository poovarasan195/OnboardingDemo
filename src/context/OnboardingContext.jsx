import { createContext, useContext, useMemo, useState } from 'react';

const OnboardingContext = createContext(null);

const initialData = {
  name: '',
  email: '',
  startDate: null,
  files: [],
};

export const OnboardingProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = useMemo(
    () => ({
      data,
      setName: (name) => setData((prev) => ({ ...prev, name })),
      setEmail: (email) => setData((prev) => ({ ...prev, email })),
      setStartDate: (startDate) => setData((prev) => ({ ...prev, startDate })),
      setFiles: (files) => setData((prev) => ({ ...prev, files })),
      reset: () => setData(initialData),
    }),
    [data],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
