import { useRouter } from 'expo-router';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/120x120/png?text=You' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Guest User</Text>
      <Text style={styles.email}>guest@example.com</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.sectionText}>You are currently signed in as a demo user.</Text>
      </View>

      <Button title="Back to Home" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
