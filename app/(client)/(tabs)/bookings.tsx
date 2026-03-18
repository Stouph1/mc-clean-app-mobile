import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../../../src/constants/theme';

export default function BookingsScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Ionicons name="calendar-outline" size={64} color={colors.border} />
      <Text style={styles.empty}>{t('no_results')}</Text>
      <Text style={styles.hint}>
        {t('book_now')}
      </Text>
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
    gap: spacing.sm,
  },
  empty: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.primaryLight,
  },
});
