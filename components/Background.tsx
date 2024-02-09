import { View, StyleSheet } from "react-native";

export default function Background() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#434546",
  },
});
