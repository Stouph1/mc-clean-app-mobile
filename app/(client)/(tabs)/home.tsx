import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { getServices } from '../../../src/services/services';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';
import type { Service } from '../../../src/types/database';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const textileServices = services?.filter((s) => s.category === 'textile') ?? [];
  const carStandard = services?.filter((s) => s.category === 'voiture' && s.formula === 'standard') ?? [];
  const carPrestige = services?.filter((s) => s.category === 'voiture' && s.formula === 'prestige') ?? [];

  const getName = (s: Service) => lang === 'fr' ? s.name_fr : s.name_en;

  const formatPrice = (s: Service) => {
    if (s.is_quote_only) return lang === 'fr' ? 'Sur devis' : 'Quote only';
    return `${s.price.toFixed(2)} €`;
  };

  const getTextileIcon = (nameFr: string) => {
    if (nameFr.includes('Fauteuil')) return 'seat-recline-normal' as const;
    if (nameFr.includes('Moquette')) return 'rug' as const;
    return 'sofa' as const;
  };

  const getVehicleLabel = (vehicleType: string | null) => {
    if (vehicleType === 'citadine') return lang === 'fr' ? 'Citadine' : 'City car';
    if (vehicleType === 'berline') return lang === 'fr' ? 'Berline' : 'Sedan';
    return 'SUV / Break';
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Banner */}
      <View style={styles.hero}>
        <View style={styles.heroLogoCircle}>
          <Text style={styles.heroLogoLetter}>M</Text>
        </View>
        <Text style={styles.welcome}>{t('welcome')}</Text>
        <Text style={styles.slogan}>{t('slogan')}</Text>
      </View>

      {/* Quick Access */}
      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.quickCard}>
          <View style={[styles.quickIcon, { backgroundColor: colors.accent + '40' }]}>
            <MaterialCommunityIcons name="sofa" size={26} color={colors.primary} />
          </View>
          <Text style={styles.quickLabel}>
            {lang === 'fr' ? 'Textile' : 'Textile'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard}>
          <View style={[styles.quickIcon, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="car-sport" size={26} color="#2E7D32" />
          </View>
          <Text style={styles.quickLabel}>
            {lang === 'fr' ? 'Voiture' : 'Car'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard}>
          <View style={[styles.quickIcon, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="document-text" size={26} color="#E65100" />
          </View>
          <Text style={styles.quickLabel}>
            {lang === 'fr' ? 'Devis' : 'Quote'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard}>
          <View style={[styles.quickIcon, { backgroundColor: '#F3E5F5' }]}>
            <Ionicons name="call" size={26} color="#7B1FA2" />
          </View>
          <Text style={styles.quickLabel}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ====== TEXTILE & AMEUBLEMENT ====== */}
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="sofa-outline" size={22} color={colors.primary} />
        <Text style={styles.sectionTitle}>
          {lang === 'fr' ? 'Textile & Ameublement' : 'Textile & Furniture'}
        </Text>
      </View>
      <View style={styles.travelNotice}>
        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color={colors.primaryLight} />
        <Text style={styles.travelText}>
          {lang === 'fr' ? 'Déplacement en Île-de-France facturé' : 'Travel in Île-de-France charged'}
        </Text>
      </View>

      {textileServices.map((service) => (
        <View key={service.id} style={styles.serviceCard}>
          <View style={styles.serviceRow}>
            <View style={styles.serviceIconBox}>
              <MaterialCommunityIcons name={getTextileIcon(service.name_fr)} size={26} color={colors.primary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{getName(service)}</Text>
              <Text style={[styles.servicePrice, service.is_quote_only && styles.quotePrice]}>
                {formatPrice(service)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.actionButton, service.is_quote_only && styles.quoteButton]}>
            {service.is_quote_only ? (
              <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
            ) : (
              <Ionicons name="calendar-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
            )}
            <Text style={styles.actionButtonText}>
              {service.is_quote_only
                ? (lang === 'fr' ? 'Demander un devis' : 'Request quote')
                : t('book_now')}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Options textile */}
      <View style={styles.optionsCard}>
        <View style={styles.optionsTitleRow}>
          <MaterialCommunityIcons name="tune-variant" size={18} color={colors.primary} />
          <Text style={styles.optionsTitle}>
            {lang === 'fr' ? 'Options complémentaires' : 'Additional options'}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <MaterialCommunityIcons name="shield-check-outline" size={18} color={colors.primaryLight} />
          <Text style={styles.optionItem}>
            {lang === 'fr' ? 'Anti-tâches & anti-acariens : +10%' : 'Anti-stain & anti-mite: +10%'}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <MaterialCommunityIcons name="lightning-bolt" size={18} color="#F59E0B" />
          <Text style={styles.optionItem}>
            {lang === 'fr' ? 'Nettoyage express (24h) : +20%' : 'Express cleaning (24h): +20%'}
          </Text>
        </View>
      </View>

      {/* ====== INTERIEUR VOITURE ====== */}
      <View style={styles.sectionHeader}>
        <Ionicons name="car-sport-outline" size={22} color={colors.primary} />
        <Text style={styles.sectionTitle}>
          {lang === 'fr' ? 'Nettoyage intérieur voiture' : 'Car interior cleaning'}
        </Text>
      </View>
      <View style={styles.travelNotice}>
        <MaterialCommunityIcons name="truck-delivery-outline" size={16} color={colors.primaryLight} />
        <Text style={styles.travelText}>
          {lang === 'fr' ? 'Déplacement en Île-de-France facturé' : 'Travel in Île-de-France charged'}
        </Text>
      </View>

      {/* Standard */}
      <View style={styles.formulaCard}>
        <View style={styles.formulaHeader}>
          <View style={styles.formulaBadge}>
            <Ionicons name="star-outline" size={14} color={colors.white} />
            <Text style={styles.formulaBadgeText}>Standard</Text>
          </View>
        </View>

        <View style={styles.featureList}>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="vacuum" size={18} color={colors.success} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Aspiration complète' : 'Complete vacuuming'}
            </Text>
          </View>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="spray" size={18} color={colors.success} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Nettoyage surfaces intérieures' : 'Interior surfaces cleaning'}
            </Text>
          </View>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="air-filter" size={18} color={colors.success} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Neutralisation des odeurs' : 'Odor neutralization'}
            </Text>
          </View>
        </View>

        <View style={styles.pricesGrid}>
          {carStandard.map((service) => (
            <View key={service.id} style={styles.priceItem}>
              <MaterialCommunityIcons
                name={service.vehicle_type === 'citadine' ? 'car-hatchback' : service.vehicle_type === 'berline' ? 'car-side' : 'car-estate'}
                size={28}
                color={colors.textPrimary}
              />
              <Text style={styles.priceVehicle}>{getVehicleLabel(service.vehicle_type)}</Text>
              <Text style={styles.priceAmount}>{service.price.toFixed(0)} €</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
          <Text style={styles.actionButtonText}>{t('book_now')}</Text>
        </TouchableOpacity>
      </View>

      {/* Prestige */}
      <View style={[styles.formulaCard, styles.prestigeCard]}>
        <View style={styles.formulaHeader}>
          <View style={[styles.formulaBadge, styles.prestigeBadge]}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.formulaBadgeText}>Prestige</Text>
          </View>
        </View>

        <View style={styles.featureList}>
          <View style={styles.featureRow}>
            <Ionicons name="checkmark-done" size={18} color={colors.success} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Tout le Standard inclus' : 'All Standard included'}
            </Text>
          </View>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="auto-fix" size={18} color={colors.primary} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Nettoyage profondeur sièges & moquettes' : 'Deep seats & carpets cleaning'}
            </Text>
          </View>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="water-outline" size={18} color={colors.primary} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Shampoing textile & anti-tâches' : 'Textile shampoo & stain treatment'}
            </Text>
          </View>
          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="flower-tulip-outline" size={18} color={colors.primary} />
            <Text style={styles.featureText}>
              {lang === 'fr' ? 'Désodorisant complet' : 'Complete deodorizing'}
            </Text>
          </View>
        </View>

        <View style={styles.pricesGrid}>
          {carPrestige.map((service) => (
            <View key={service.id} style={styles.priceItem}>
              <MaterialCommunityIcons
                name={service.vehicle_type === 'citadine' ? 'car-hatchback' : service.vehicle_type === 'berline' ? 'car-side' : 'car-estate'}
                size={28}
                color={colors.textPrimary}
              />
              <Text style={styles.priceVehicle}>{getVehicleLabel(service.vehicle_type)}</Text>
              <Text style={styles.priceAmount}>{service.price.toFixed(0)} €</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.actionButton, styles.prestigeButton]}>
          <Ionicons name="diamond-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
          <Text style={styles.actionButtonText}>{t('book_now')}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },

  // Hero
  hero: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroLogoCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.white,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  heroLogoLetter: { fontSize: 28, fontWeight: 'bold', color: colors.primary },
  welcome: { fontSize: fontSize.xl, fontWeight: 'bold', color: colors.white },
  slogan: { fontSize: fontSize.sm, color: colors.accent, marginTop: spacing.xs, fontStyle: 'italic' },

  // Quick access
  quickAccess: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  quickCard: {
    flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.md,
    paddingVertical: spacing.md, alignItems: 'center', gap: spacing.xs,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },
  quickIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 11, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },

  // Section
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.xs },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textPrimary },
  travelNotice: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.md, paddingLeft: 2 },
  travelText: { fontSize: fontSize.xs, color: colors.primaryLight, fontStyle: 'italic' },

  // Service card
  serviceCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },
  serviceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  serviceIconBox: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: colors.accent + '35',
    justifyContent: 'center', alignItems: 'center',
  },
  serviceInfo: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary, flex: 1 },
  servicePrice: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
  quotePrice: { fontSize: fontSize.sm, color: colors.primaryLight, fontStyle: 'italic' },

  // Action buttons
  actionButton: {
    backgroundColor: colors.primaryLight, borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm, alignItems: 'center', marginTop: spacing.md,
    flexDirection: 'row', justifyContent: 'center',
  },
  quoteButton: { backgroundColor: '#E65100' },
  actionButtonText: { color: colors.white, fontWeight: '600', fontSize: fontSize.sm },

  // Options
  optionsCard: {
    backgroundColor: colors.accent + '20', borderRadius: borderRadius.md,
    padding: spacing.md, marginVertical: spacing.sm, gap: spacing.sm,
    borderWidth: 1, borderColor: colors.accent + '40',
  },
  optionsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  optionsTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  optionItem: { fontSize: fontSize.sm, color: colors.textPrimary, flex: 1 },

  // Formula card
  formulaCard: {
    backgroundColor: colors.white, borderRadius: borderRadius.lg,
    padding: spacing.md, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3,
  },
  prestigeCard: { borderColor: colors.primary + '30' },
  formulaHeader: { marginBottom: spacing.md },
  formulaBadge: {
    backgroundColor: colors.primaryLight, borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md, paddingVertical: 6, alignSelf: 'flex-start',
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
  },
  prestigeBadge: { backgroundColor: colors.primary },
  formulaBadgeText: { color: colors.white, fontWeight: '700', fontSize: fontSize.sm },

  // Features
  featureList: { gap: spacing.sm, marginBottom: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { fontSize: fontSize.sm, color: colors.textSecondary, flex: 1 },

  // Prices grid
  pricesGrid: {
    flexDirection: 'row', gap: spacing.sm,
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  priceItem: { flex: 1, alignItems: 'center', gap: 4 },
  priceVehicle: { fontSize: 11, color: colors.textSecondary, textAlign: 'center' },
  priceAmount: { fontSize: fontSize.lg, fontWeight: '800', color: colors.primary },

  prestigeButton: { backgroundColor: colors.primary },
});
