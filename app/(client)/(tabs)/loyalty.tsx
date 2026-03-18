import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';

const TOTAL_STAMPS = 5;
const CURRENT_STAMPS = 0; // TODO: fetch from Supabase

export default function LoyaltyScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="gift" size={28} color={colors.primary} />
        <Text style={styles.title}>{t('my_loyalty_card')}</Text>
        <Text style={styles.subtitle}>McClean</Text>

        <View style={styles.stampsRow}>
          {Array.from({ length: TOTAL_STAMPS }).map((_, index) => (
            <View key={index} style={styles.stampContainer}>
              <View
                style={[
                  styles.stamp,
                  index < CURRENT_STAMPS && styles.stampFilled,
                ]}
              >
                {index < CURRENT_STAMPS ? (
                  <Ionicons name="checkmark" size={24} color={colors.white} />
                ) : (
                  <Text style={styles.stampNumber}>{index + 1}</Text>
                )}
              </View>
              {index === 2 && (
                <View style={styles.rewardBadge}>
                  <Text style={styles.rewardText}>-30€</Text>
                </View>
              )}
              {index === 4 && (
                <View style={[styles.rewardBadge, styles.rewardFree]}>
                  <Ionicons name="gift" size={12} color={colors.white} />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <Ionicons name="pricetag" size={18} color={colors.primaryLight} />
            <Text style={styles.legendText}>
              {lang === 'fr' ? '3ᵉ passage : -30€' : '3rd visit: -€30'}
            </Text>
          </View>
          <View style={styles.legendRow}>
            <Ionicons name="gift" size={18} color={colors.success} />
            <Text style={styles.legendText}>
              {lang === 'fr' ? '5ᵉ passage : lavage offert' : '5th visit: free wash'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={20} color={colors.primaryLight} />
        <Text style={styles.infoText}>
          {lang === 'fr'
            ? 'Chaque service réalisé et payé vous rapproche d\'une récompense !'
            : 'Every completed and paid service brings you closer to a reward!'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  stampsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stampContainer: {
    alignItems: 'center',
  },
  stamp: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  stampFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stampNumber: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  rewardBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  rewardFree: {
    backgroundColor: colors.success,
  },
  rewardText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  legend: {
    gap: spacing.sm,
    width: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  infoCard: {
    backgroundColor: colors.accent + '30',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
});
