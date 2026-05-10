import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "./src/components/connection/supabase";

type PasswordItem = {
  id: number;
  account: string;
  password: string;
  created_at?: string;
};

export default function App() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPasswords();
  }, []);

  const loadPasswords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("passwords")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setPasswords(data || []);
    }

    setLoading(false);
  };

  const addPassword = async () => {
    if (!account.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter account and password.");
      return;
    }

    const { error } = await supabase.from("passwords").insert([
      {
        account: account.trim(),
        password: password.trim(),
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    setAccount("");
    setPassword("");
    loadPasswords();
  };

  const deletePassword = (id: number) => {
    Alert.alert("Delete", "Are you sure you want to delete this account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("passwords")
            .delete()
            .eq("id", id);

          if (error) {
            Alert.alert("Error", error.message);
            return;
          }

          loadPasswords();
        },
      },
    ]);
  };

  const toggleShowPassword = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Password List</Text>
      <Text style={styles.subtitle}>Connected to Supabase</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Account name"
          value={account}
          onChangeText={setAccount}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.addButton} onPress={addPassword}>
          <Text style={styles.addButtonText}>Save Password</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No saved passwords yet.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.accountText}>{item.account}</Text>

              <Text style={styles.passwordText}>
                {showPassword[item.id] ? item.password : "••••••••"}
              </Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.showButton}
                  onPress={() => toggleShowPassword(item.id)}
                >
                  <Text style={styles.showButtonText}>
                    {showPassword[item.id] ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePassword(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  accountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  passwordText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  showButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  showButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 30,
  },
});