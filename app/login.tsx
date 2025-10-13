import { View, Text, StyleSheet } from 'react-native';
import SignInButton from '../components/sign-in-button';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Use your Google account to continue</Text>

            <SignInButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
});