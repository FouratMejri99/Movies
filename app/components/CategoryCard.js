import { StyleSheet, Text, View } from "react-native";

export default function CategoryCard({ name }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 50,
    backgroundColor: "#FBBF24",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#fff", fontWeight: "bold" },
});
