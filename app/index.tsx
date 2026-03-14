import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../src/stores/auth';
import { colors } from '../src/constants/theme';

export default function Index() {
  const { session, isLoading, isAdmin } = useAuthStore();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (isAdmin) {
    return <Redirect href="/(admin)/(tabs)/dashboard" />;
  }

  return <Redirect href="/(client)/(tabs)/home" />;
}
