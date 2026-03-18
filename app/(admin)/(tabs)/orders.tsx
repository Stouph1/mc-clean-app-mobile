import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../../../src/constants/theme';

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="clipboard-text-outline" size={64} color={colors.border} />
      <Text style={styles.empty}>Aucune commande pour le moment</Text>
      <Text style={styles.hint}>Les commandes clients apparaîtront ici</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.background,
    justifyContent: 'center', alignItems: 'center',
    padding: spacing.md, gap: spacing.sm,
  },
  empty: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.sm },
  hint: { fontSize: fontSize.sm, color: colors.primaryLight },
});
