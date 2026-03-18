import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Ionicons name="cart" size={28} color={colors.primary} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Commandes</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cash" size={28} color={colors.success} />
          <Text style={styles.statValue}>0 €</Text>
          <Text style={styles.statLabel}>Chiffre d'affaires</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Ionicons name="people" size={28} color={colors.primaryLight} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Clients</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="document-text" size={28} color={colors.warning} />
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Devis en attente</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
