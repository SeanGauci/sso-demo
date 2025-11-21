import { useRouter } from 'expo-router';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  // Example purchase data
  const purchases = [
    {
      id: '1',
      totalCost: 49.99,
      items: ['Wireless Mouse', 'USB-C Cable'],
      status: 'Delivered',
      date: '2025-11-10',
      images: [
        'https://placehold.co/100x100/png?text=Mouse',
        'https://placehold.co/100x100/png?text=Cable'
      ],
    },
    {
      id: '2',
      totalCost: 19.99,
      items: ['Bluetooth Speaker'],
      status: 'Processing',
      date: '2025-11-18',
      images: [
        'https://placehold.co/100x100/png?text=Speaker'
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purchases</Text>
          {purchases.length === 0 ? (
            <Text style={styles.sectionText}>No purchases yet.</Text>
          ) : (
            purchases.map((purchase) => (
              <View key={purchase.id} style={styles.purchaseItem}>
                <Text style={styles.purchaseTitle}>
                  {purchase.items.join(', ')}
                </Text>
                <Text style={styles.purchaseDetail}>Total: €{purchase.totalCost.toFixed(2)}</Text>
                <Text style={styles.purchaseDetail}>Status: {purchase.status}</Text>
                <Text style={styles.purchaseDetail}>Date: {purchase.date}</Text>
                <Button
                  title="View Details"
                  onPress={() => router.push(`/purchase/${purchase.id}`)}
                />
              </View>
            ))
          )}
        </View>

        <Button title="Back to Home" onPress={() => router.push('/')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      paddingBottom: 32,
    },
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
  purchaseItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  purchaseTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  purchaseDetail: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
});
