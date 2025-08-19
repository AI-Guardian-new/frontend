import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function GuardianForm() {
  const [guardian1, setGuardian1] = useState("");
  const [guardian2, setGuardian2] = useState("");
  const [guardian3, setGuardian3] = useState("");
  const router = useRouter();

  return (
    <View style={s.container}>
      {/* 제목 */}
      <Text style={s.title}>보호자 연락처 입력</Text>

      {/* 입력칸 3개 */}
      <TextInput
        style={s.input}
        placeholder="보호자 1 연락처"
        keyboardType="phone-pad"
        value={guardian1}
        onChangeText={setGuardian1}
      />
      <TextInput
        style={s.input}
        placeholder="보호자 2 연락처"
        keyboardType="phone-pad"
        value={guardian2}
        onChangeText={setGuardian2}
      />
      <TextInput
        style={s.input}
        placeholder="보호자 3 연락처"
        keyboardType="phone-pad"
        value={guardian3}
        onChangeText={setGuardian3}
      />

      {/* 저장 버튼 (화면 맨 밑 꽉 차게) */}
      <TouchableOpacity style={s.btn} onPress={() => router.push("/forms/addressInfo")}>
        <Text style={s.btnText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: baseFont,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    fontSize: 16,
    fontFamily: baseFont,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#000",
    paddingVertical: 18,
    borderRadius: 0,
    width: "100%",
    position: "absolute", // 화면 맨 밑
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  btnText: {
    fontFamily: baseFont,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
