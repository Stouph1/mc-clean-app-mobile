import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';

const TOTAL_STAMPS = 5;
const CURRENT_STAMPS = 0; // TODO: fetch from Supabase

export default function LoyaltyScreen() {
  const { t } = useTranslation();

  return (
    <ScrollableContent>
      <View style={styles.card}>
        <Text style={styles.title}>{t('my_loyalty_card')}</Text>
        <Text style={styles.subtitle}>McClean</Text>

        <View style={styles.stampsRow}>
          {Array.from({ length: TOTAL_STAMPS }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stamp,
                index < CURRENT_STAMPS && styles.stampFilled,
              ]}
            >
              {index < CURRENT_STAMPS && <Text style={styles.stampCheck}>✓</Text>}
              {index === 2 && (
                <Text style={styles.stampReward}>-30€</Text>
              )}
              {index === 4 && (
                <Text style={styles.stampReward}>Gratuit</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <Text style={styles.legendText}>3ᵉ passage : -30€</Text>
          <Text style={styles.legendText}>5ᵉ passage : lavage offert</Text>
        </View>
      </View>
    </ScrollableContent>
  );
}

function ScrollableContent({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.md,
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
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  stampsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stamp: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stampFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stampCheck: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  stampReward: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  legend: {
    gap: spacing.xs,
    alignItems: 'center',
  },
  legendText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
