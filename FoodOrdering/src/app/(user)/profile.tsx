import { supabase } from '@/src/lib/supabase';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/sign-in'); // Redirect user to login screen
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default ProfileScreen;