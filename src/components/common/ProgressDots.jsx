import { View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/layout';

export const ProgressDots = ({ total, current }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: spacing.xs,
        alignItems: 'center',
      }}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index < current;
        return (
          <View
            key={`dot-${index}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: isActive ? colors.primary : colors.border,
            }}
          />
        );
      })}
    </View>
  );
};
