import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";

import "@/firebaseConfig";
import { login } from "@/services/AuthService";
import { useRouter } from "expo-router";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    login(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setError("");
        router.replace("/(app)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        handleSetError(errorCode);
      });
  };

  const handleSetError = (message: string) => {
    switch (message) {
      case "auth/user-not-found":
        setError("Kullanıcı bulunamadı");
        break;
      case "auth/wrong-password":
        setError("Hatalı şifre");
        break;
      case "auth/invalid-email":
        setError("Geçersiz e-posta");
        break;
      default:
        setError("E-post ya da Şifre hatalı");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text style={{ color: "red" }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
