import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function AddressForm() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  // 더미 위치 가져오기
  const getDummyLocation = () => {
    const dummy = "서울특별시 강남구 테헤란로 123";
    setAddress(dummy);
  };

  return (
    <View style={s.container}>
      {/* 상단 제목 */}
      <Text style={s.title}>📍 주소 입력</Text>

      {/* 주소 입력칸 */}
      <TextInput
        style={s.input}
        placeholder="주소를 입력하세요"
        value={address}
        onChangeText={setAddress}
      />

      {/* 현재 위치 가져오기 (더미데이터) */}
      <TouchableOpacity style={s.btnSecondary} onPress={getDummyLocation}>
        <Text style={s.btnSecondaryText}>현재 위치 가져오기</Text>
      </TouchableOpacity>

      {/* 입력하기 버튼 */}
      <TouchableOpacity
        style={s.btnPrimary}
        onPress={() => router.push("/forms/mainboard")}
      >
        <Text style={s.btnPrimaryText}>입력하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: baseFont,
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
    marginBottom: 20,
    fontFamily: baseFont,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  btnSecondaryText: {
    fontSize: 16,
    color: "#000",
    fontFamily: baseFont,
    fontWeight: "600",
  },
  btnPrimary: {
    backgroundColor: "#000",
    paddingVertical: 18,
    borderRadius: 0,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: baseFont,
  },
});
