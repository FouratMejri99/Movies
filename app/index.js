// app/IntroScreen.js
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import restaurantImage from "../assets/images/restaurant.jpg";
export default function IntroScreen() {
  const router = useRouter();
  const scheme = useColorScheme(); // detect dark mode
  const fadeAnim = useRef(new Animated.Value(0)).current; // initial opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: scheme === "dark" ? "#1F2937" : "#fff" },
      ]}
    >
      <Animated.Image
        source={restaurantImage}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <Animated.Text
        style={[
          styles.title,
          { color: scheme === "dark" ? "#fff" : "#111827", opacity: fadeAnim },
        ]}
      >
        Welcome to Fourat Palace
      </Animated.Text>
      <Animated.Text
        style={[
          styles.subtitle,
          {
            color: scheme === "dark" ? "#D1D5DB" : "#6B7280",
            opacity: fadeAnim,
          },
        ]}
      >
        Discover delicious food and order in seconds
      </Animated.Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/homescreen")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FBBF24",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
