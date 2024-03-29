import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TextInput } from "react-native";
import Background from "@/components/Background";

import "@/firebaseConfig";
import { login } from "@/services/AuthService";
import { useRouter } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";

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
    <View style={styles.mainContainer}>
      <Background />
      <View style={styles.container}>
        <CustomTextInput
          placeholder="E-posta"
          onChangeText={setEmail}
          value={email}
        />

        <CustomTextInput
          placeholder="Şifre"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <View style={styles.buttonsContainer}>
          <CustomButton
            buttonLabel="Kayıt Ol"
            onPress={() => router.navigate("/register")}
          />
          <CustomButton buttonLabel="Giriş Yap" onPress={handleLogin} />
        </View>

        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
