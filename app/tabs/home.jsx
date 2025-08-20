import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from "react-native";
import { useState } from "react";
import * as Linking from "expo-linking"; // Expo 환경이라면 expo-linking, 일반 RN은 import { Linking } from "react-native"

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
    setModalVisible(false);
  };

  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <Text style={s.logo}>📢 AI Guardian</Text>
        <Text style={s.status}>📍 위치 활성화 · ✅ 안전</Text>
      </View>

      {/* 현재 지역 / 날씨 카드 (크게) */}
      <View style={[s.card, s.weatherCard]}>
        <Text style={s.location}>서울특별시 강남구</Text>
        <Text style={s.subText}>☁️ 현재 날씨: 흐림 · 27℃</Text>
      </View>

      {/* 긴급 신고 버튼 (조금 줄임) */}
      <TouchableOpacity style={s.sosBtn} onPress={() => setModalVisible(true)}>
        <Text style={s.sosText}>🚨 긴급 신고 (SOS)</Text>
      </TouchableOpacity>

      {/* 긴급 신고 Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>📞 신고 전화 연결</Text>

            <TouchableOpacity style={s.callBtn} onPress={() => callNumber("119")}>
              <Text style={s.callText}>119 (긴급)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.callBtn} onPress={() => callNumber("112")}>
              <Text style={s.callText}>112 (긴급)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.callBtn} onPress={() => callNumber("110")}>
              <Text style={s.callText}>110 (비긴급)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.callBtn} onPress={() => callNumber("15883650")}>
              <Text style={s.callText}>1588-3650 (재난)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={s.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={s.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 기능 버튼 2개 */}
      <View style={s.row}>
        <TouchableOpacity style={s.subBtn} onPress={() => {}}>
          <Text style={s.subTextBig}>📍 대피소 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.subBtn} onPress={() => {}}>
          <Text style={s.subTextBig}>👨‍👩‍👧 보호자 연락</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" },
  logo: { fontSize: 20, fontWeight: "700", fontFamily: baseFont },
  status: { fontSize: 14, color: "green", fontFamily: baseFont },

  card: { backgroundColor: "#fff", padding: 24, borderRadius: 12, marginBottom: 20 },
  weatherCard: { flex: 1.6, alignItems: "center", justifyContent: "center" }, // ⬅️ 날씨 카드 크게

  location: { fontSize: 22, fontWeight: "700", fontFamily: baseFont, marginBottom: 8 },
  subText: { fontSize: 16, color: "#555", fontFamily: baseFont },

  sosBtn: {
    backgroundColor: "#d32f2f",
    flex: 0.6, // ⬅️ 긴급 신고 버튼 줄임
    borderRadius: 14,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sosText: { color: "#fff", fontSize: 22, fontWeight: "700", fontFamily: baseFont },

  row: { flexDirection: "row", justifyContent: "space-between", flex: 1 },
  subBtn: {
    backgroundColor: "#eee",
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  subTextBig: { fontSize: 18, fontWeight: "700", fontFamily: baseFont },

  // Modal 스타일
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "80%", backgroundColor: "#fff", borderRadius: 12, padding: 20, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
  callBtn: { backgroundColor: "#eee", width: "100%", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  callText: { fontSize: 17, fontWeight: "500" }, // ⬅️ 글씨 얇게
  closeBtn: { marginTop: 10 },
  closeText: { fontSize: 16, color: "red", fontWeight: "500" },
});
