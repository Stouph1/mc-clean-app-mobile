import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.welcome}>{t('welcome')}</Text>
        <Text style={styles.slogan}>{t('slogan')}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('services')}</Text>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceName}>Nettoyage intérieur voiture</Text>
        <Text style={styles.servicePrice}>À partir de 49,90 €</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>{t('book_now')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceName}>Nettoyage canapé</Text>
        <Text style={styles.servicePrice}>À partir de 59,90 €</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>{t('book_now')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceName}>Nettoyage tapis</Text>
        <Text style={styles.servicePrice}>À partir de 39,90 €</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>{t('book_now')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  welcome: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.white,
  },
  slogan: {
    fontSize: fontSize.sm,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  serviceCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  servicePrice: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  bookButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
});
