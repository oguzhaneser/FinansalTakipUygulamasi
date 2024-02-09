import { StyleSheet, TextInput } from "react-native";

export default function CustomTextInput(props: {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      placeholderTextColor={"#ffffff"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    marginVertical: 4,
    padding: 10,
    backgroundColor: "#353d41",
    borderRadius: 10,
    color: "#ffffff",
    elevation: 5,
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
