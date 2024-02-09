import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Background from "@/components/Background";

import "@/firebaseConfig";
import { register, login } from "@/services/AuthService";
import { useRouter } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = () => {
    register(email, password)
      .then((userCredential) => {
        // Kayıt olundu.
        const user = userCredential.user;
        console.log(user);
        login(email, password).then((userCredential) => {
          // Giriş yapıldı.
          router.back();
          router.replace("/(app)");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
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

        <CustomButton
          buttonLabel="Kayıt Ol"
          onPress={handleRegister}
          fullWidth
        />
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
});
