import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 시작 화면 (개인정보 입력) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 탭 네비게이션 */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
