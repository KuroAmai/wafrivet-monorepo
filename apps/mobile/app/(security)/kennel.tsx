import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function KennelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Kennel</Text>
      <Text style={styles.subtitle}>Security company dog roster (scaffold)</Text>
      <Link href="/(security)/billing" style={styles.link}>
        Billing
      </Link>
      <Link href="/(security)/scan" style={styles.link}>
        Scan collar tag
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 15, color: "#666" },
  link: { fontSize: 16, color: "#2D4D31", fontWeight: "600" },
});
