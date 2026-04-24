import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
};

const LoginScreen: React.FC<Props> = ({
  username,
  password,
  setUsername,
  setPassword,
  onLogin,
}) => {
  return (
    <View>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Login" onPress={onLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
  },
});