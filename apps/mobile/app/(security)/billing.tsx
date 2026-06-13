import { StyleSheet, Text, View } from "react-native";

export default function SecurityBillingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kennel billing</Text>
      <Text style={styles.subtitle}>Trial, monthly rate, and Paystack card setup (scaffold).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 15, color: "#666" },
});
