import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { api } from '../api/mock';
import { theme } from '../theme';

export default function Drone() {
  const [eta, setEta] = useState<number>(15);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(async () => {
      const r = await api.get('/drone/status');
      setEta(r.data.etaMinutes);
      setProgress(r.data.progress);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drone Delivery Tracking</Text>
      <View style={styles.barBg}><View style={[styles.barFill, { width: `${Math.round(progress * 100)}%` }]} /></View>
      <Text>ETA: {eta} minutes</Text>
      <View style={styles.map}><Text style={{ color: theme.colors.secondaryText }}>Map placeholder (drone en-route...)</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: theme.colors.primary },
  barBg: { height: 12, backgroundColor: '#eee', borderRadius: 8, overflow: 'hidden', marginVertical: 12 },
  barFill: { height: '100%', backgroundColor: theme.colors.primary },
  map: { marginTop: 12, height: 300, backgroundColor: '#f8f8f8', borderRadius: 12, alignItems: 'center', justifyContent: 'center' }
});


