import { Stack } from "expo-router";

export default function SecurityLayout() {
  return (
    <Stack>
      <Stack.Screen name="kennel" options={{ title: "Kennel" }} />
      <Stack.Screen name="billing" options={{ title: "Billing" }} />
      <Stack.Screen name="scan" options={{ title: "Scan tag" }} />
      <Stack.Screen name="dog/[id]" options={{ title: "Dog profile" }} />
    </Stack>
  );
}
