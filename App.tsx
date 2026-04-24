import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mockUser = {
    username: 'admin',
    password: '1234',
  };

  const handleLogin = () => {
    if (username === mockUser.username && password === mockUser.password) {
      console.log('Login SUCCESS:', username);
      setIsLoggedIn(true);
    } else {
      console.log('Login FAILED');
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <HomeScreen username={username} onLogout={handleLogout} />
      ) : (
        <LoginScreen
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});