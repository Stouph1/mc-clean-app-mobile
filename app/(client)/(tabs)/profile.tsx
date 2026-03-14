import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../../src/i18n';
import { supabase } from '../../../src/lib/supabase';
import { useAuthStore } from '../../../src/stores/auth';
import { colors, spacing, borderRadius, fontSize } from '../../../src/constants/theme';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(t('error'), error.message);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <Text style={styles.name}>{user?.user_metadata?.full_name ?? '-'}</Text>
        <Text style={styles.email}>{user?.email ?? '-'}</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
        <Text style={styles.menuText}>{t('language')}</Text>
        <Text style={styles.menuValue}>
          {i18n.language === 'fr' ? t('french') : t('english')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
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
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  email: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  menuItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  menuValue: {
    fontSize: fontSize.md,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoutText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
