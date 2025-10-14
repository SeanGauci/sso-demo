import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SignInButton() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '441353261710-6vth2v1v5muvci79bo04sq1gn2km5otg.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('Access token:', authentication?.accessToken);
            // Handle login success (e.g., navigate or call backend)
        }
    }, [response]);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => promptAsync()}
            disabled={!request}
        >
            <Text style={styles.text}>Sign In with Google</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});