import { Link, Stack } from 'expo-router';
import { Button, View } from 'react-native';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerRight: () => (
                    <View style={{ marginRight: 12 }}>
                        <Link href="/profile" asChild>
                            <Button title="Profile" />
                        </Link>
                    </View>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="login" options={{ title: 'Login' }} />
            <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        </Stack>
    );
}
