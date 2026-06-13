import { StyleSheet, Text, View } from "react-native";

export default function SecurityScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan collar tag</Text>
      <Text style={styles.subtitle}>NFC tap flow will open public K-ID profiles (scaffold).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 15, color: "#666" },
});
