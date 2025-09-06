import { useRouter } from "expo-router";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BottomNav({ scheme }) {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        styles.safeArea,
        { backgroundColor: scheme === "dark" ? "#1F2937" : "#F3F4F6" },
      ]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: scheme === "dark" ? "#111827" : "#fff" },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/homescreen")}>
          <Text
            style={[
              styles.text,
              { color: scheme === "dark" ? "#fff" : "#111827" },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/confirmedorders")}>
          <Text
            style={[
              styles.text,
              { color: scheme === "dark" ? "#fff" : "#111827" },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {},
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: Platform.OS === "android" ? 10 : 0,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
