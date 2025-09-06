import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useOrders } from "../app/context/OrdersContext";
import BottomNav from "./components/BottomNav";

export default function ConfirmedOrders() {
  const { orders, removeOrder } = useOrders();
  const scheme = useColorScheme();

  if (orders.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: scheme === "dark" ? "#1F2937" : "#F3F4F6" },
        ]}
      >
        <Text
          style={[
            styles.emptyText,
            { color: scheme === "dark" ? "#fff" : "#6B7280" },
          ]}
        >
          No confirmed orders yet!
        </Text>
        <Text
          style={[
            styles.emptySubText,
            { color: scheme === "dark" ? "#D1D5DB" : "#9CA3AF" },
          ]}
        >
          Start adding your favorite dishes 🍕🍣🍰
        </Text>
        <BottomNav scheme={scheme} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.flexContainer,
        { backgroundColor: scheme === "dark" ? "#1F2937" : "#F3F4F6" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map((order, index) => {
          const fadeAnim = new Animated.Value(1);

          const handleDelete = () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => removeOrder(index));
          };

          return (
            <Animated.View
              key={index}
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  backgroundColor: scheme === "dark" ? "#374151" : "#fff",
                },
              ]}
            >
              <View style={styles.info}>
                <Text
                  style={[
                    styles.name,
                    { color: scheme === "dark" ? "#fff" : "#111827" },
                  ]}
                >
                  {order.name}
                </Text>
                <Text
                  style={[
                    styles.details,
                    { color: scheme === "dark" ? "#D1D5DB" : "#6B7280" },
                  ]}
                >
                  Quantity: {order.quantity}
                </Text>
                <Text
                  style={[
                    styles.details,
                    { color: scheme === "dark" ? "#D1D5DB" : "#6B7280" },
                  ]}
                >
                  Size: {order.size}
                </Text>
                <Text
                  style={[
                    styles.details,
                    { color: scheme === "dark" ? "#D1D5DB" : "#6B7280" },
                  ]}
                >
                  Price: {order.price}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
      <BottomNav scheme={scheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 100, // give space for bottom nav
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {},
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  details: { fontSize: 14 },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80, // space for bottom nav
  },
  emptyText: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  emptySubText: { fontSize: 16, textAlign: "center" },
});
