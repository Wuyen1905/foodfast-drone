import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';

export default function Checkout({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const pay = async () => {
    setLoading(true);
    const res = await api.post('/checkout', {});
    setLoading(false);
    setMessage(`Order ${res.data.orderId} confirmed!`);
    setTimeout(() => navigation.navigate('Drone'), 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Payment method: Visa **** 0420</Text>
      <Pressable disabled={loading} onPress={pay} style={styles.cta}><Text style={{ color: '#fff' }}>{loading ? 'Processing...' : 'Pay now'}</Text></Pressable>
      {message ? <Text style={{ color: theme.colors.primary, marginTop: 8 }}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: theme.colors.primary },
  cta: { marginTop: 12, backgroundColor: theme.colors.primary, paddingVertical: 12, borderRadius: 8, alignItems: 'center' }
});


