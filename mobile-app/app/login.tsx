import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { theme } from '@/theme';

export default function Login() {
  const { login, user, loading } = useAuth();
  const params = useLocalSearchParams();
  const from = (params.from as string) || '/home';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      handleRedirect(user);
    }
  }, [user, loading]);

  const handleRedirect = (loggedInUser: typeof user) => {
    if (!loggedInUser) return;

    let redirectPath = from;
    
    if (loggedInUser.role === 'restaurant') {
      redirectPath = '/restaurant';
    } else if (loggedInUser.role === 'admin') {
      redirectPath = '/admin';
    } else {
      // Customer - go to home or original destination
      redirectPath = from === '/login' ? '/home' : from;
    }

    router.replace(redirectPath);
  };

  const onSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const res = await login(username.trim(), password);
      
      if (res.ok && res.user) {
        handleRedirect(res.user);
      } else {
        setError(res.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodFast Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!busy}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!busy}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={busy}
      >
        {busy ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Pressable>

      <Text style={styles.hint}>Test accounts:{'\n'}admin/admin123{'\n'}restaurant/restaurant123{'\n'}customer/customer123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#dc3545',
    marginBottom: 16,
    textAlign: 'center',
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: theme.colors.secondaryText,
    textAlign: 'center',
  },
});

