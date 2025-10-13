import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function SignInButton() {
    const handlePress = () => {
        Alert.alert('Sign In', 'This is where Google SSO will be integrated.');
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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
