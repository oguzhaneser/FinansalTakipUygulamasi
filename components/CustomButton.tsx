import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function CustomButton(props: {
  buttonLabel: string;
  onPress: () => void;
  href?: `${string}:${string}`;
  fullWidth?: boolean;
}) {
  if (props.href) {
    return (
      <Link
        href={props.href}
        asChild
        style={{ width: props.fullWidth ? "100%" : "auto" }}
      >
        <TouchableOpacity>
          <Text>{props.buttonLabel}</Text>
        </TouchableOpacity>
      </Link>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.button, { width: props.fullWidth ? "100%" : "auto" }]}
        onPress={props.onPress}
      >
        <Text>{props.buttonLabel}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 80,
    alignItems: "center",
  },
});
