import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform, Alert } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function AddressForm() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 필요", "위치 접근 권한이 필요합니다.");
        return;
      }

      // GPS 좌표 가져오기
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 좌표 → 상세 주소 변환
      let [geo] = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geo) {
        const fullAddress = `${geo.country || ""} ${geo.region || ""} ${geo.city || ""} ${geo.district || ""} ${geo.street || ""} ${geo.streetNumber || ""} ${geo.postalCode || ""}`;
        setAddress(fullAddress.trim());
      }
    } catch (err) {
      console.error(err);
      Alert.alert("오류", "현재 위치를 가져올 수 없습니다.");
    }
  };

  return (
    <View style={s.container}>
      {/* 주소 입력칸 */}
      <TextInput
        style={s.input}
        placeholder="주소를 입력하세요"
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
      />

      {/* 현재 위치 가져오기 */}
      <TouchableOpacity style={s.subBtn} onPress={getLocation}>
        <Text style={s.subBtnText}>현재 위치 가져오기</Text>
      </TouchableOpacity>

      {/* 저장하기 (맨 밑 꽉 차게) */}
      <TouchableOpacity style={s.saveBtn} onPress={() => router.push('/forms/mainboard')}>
        <Text style={s.saveText}>저장하기</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginTop: 40,
    marginBottom: 15,
  },
  subBtn: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  subBtnText: {
    fontSize: 16,
    color: "#000",
    fontFamily: baseFont,
    fontWeight: "600",
  },
  saveBtn: {
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
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: baseFont,
  },
});
