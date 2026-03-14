import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../../../src/constants/theme';

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.empty}>Planning vide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  empty: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
