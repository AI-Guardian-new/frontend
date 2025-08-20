import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function GuardianForm() {
  const [guardian1, setGuardian1] = useState({ name: "", phone: "" });
  const [guardian2, setGuardian2] = useState({ name: "", phone: "" });
  const [guardian3, setGuardian3] = useState({ name: "", phone: "" });
  const router = useRouter();

  return (
    <View style={s.container}>
      {/* 제목 */}
      <Text style={s.title}>👨‍👩‍👧 보호자 정보 입력</Text>

      {/* 보호자 1 */}
      <View style={s.card}>
        <Text style={s.cardTitle}>보호자 1</Text>
        <View style={s.row}>
          <TextInput
            style={[s.input, s.nameInput]}
            placeholder="이름"
            value={guardian1.name}
            onChangeText={(text) => setGuardian1({ ...guardian1, name: text })}
          />
          <TextInput
            style={[s.input, s.phoneInput]}
            placeholder="연락처"
            keyboardType="phone-pad"
            value={guardian1.phone}
            onChangeText={(text) => setGuardian1({ ...guardian1, phone: text })}
          />
        </View>
      </View>

      {/* 보호자 2 */}
      <View style={s.card}>
        <Text style={s.cardTitle}>보호자 2</Text>
        <View style={s.row}>
          <TextInput
            style={[s.input, s.nameInput]}
            placeholder="이름"
            value={guardian2.name}
            onChangeText={(text) => setGuardian2({ ...guardian2, name: text })}
          />
          <TextInput
            style={[s.input, s.phoneInput]}
            placeholder="연락처"
            keyboardType="phone-pad"
            value={guardian2.phone}
            onChangeText={(text) => setGuardian2({ ...guardian2, phone: text })}
          />
        </View>
      </View>

      {/* 보호자 3 */}
      <View style={s.card}>
        <Text style={s.cardTitle}>보호자 3</Text>
        <View style={s.row}>
          <TextInput
            style={[s.input, s.nameInput]}
            placeholder="이름"
            value={guardian3.name}
            onChangeText={(text) => setGuardian3({ ...guardian3, name: text })}
          />
          <TextInput
            style={[s.input, s.phoneInput]}
            placeholder="연락처"
            keyboardType="phone-pad"
            value={guardian3.phone}
            onChangeText={(text) => setGuardian3({ ...guardian3, phone: text })}
          />
        </View>
      </View>

      {/* 저장 버튼 */}
      <TouchableOpacity
        style={s.btn}
        onPress={() => {
          router.push("/forms/addressInfo"); // 다음 페이지 경로 확인 필요
        }}
      >
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
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  cardTitle: {
    fontFamily: baseFont,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 13,
    fontFamily: baseFont,
  },
  nameInput: {
    width: 80, // 이름 칸 좁게 고정
    marginRight: 8,
  },
  phoneInput: {
    flex: 1, // 연락처는 남은 공간 전부 차지
  },
  btn: {
    backgroundColor: "#000",
    paddingVertical: 16,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  btnText: {
    fontFamily: baseFont,
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
