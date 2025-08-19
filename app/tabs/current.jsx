import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { fetchEmergencyData } from "../api/emergency.js"; // 실제 API 연결

// 6개 재난 유형 데이터
const disasterConfig = {
  "태풍": {
    icon: "🌪️",
    summary: "창문을 닫고 외출을 자제하세요",
    detail: "강풍 시 외출을 삼가고 창문과 문을 단단히 닫으세요. 해안가 주민은 신속히 대피하세요."
  },
  "지진": {
    icon: "🌍",
    summary: "탁자 밑으로 몸을 보호하세요",
    detail: "지진 시에는 탁자 아래로 몸을 숨기고, 흔들림이 멈추면 전기·가스를 차단 후 안전한 곳으로 대피하세요."
  },
  "폭염": {
    icon: "🌡️",
    summary: "수분을 섭취하고 외출을 자제하세요",
    detail: "외출을 피하고, 냉방이 가능한 장소에서 휴식을 취하며 수분을 충분히 섭취하세요."
  },
  "홍수": {
    icon: "🌊",
    summary: "저지대 주민은 신속히 대피하세요",
    detail: "하천·계곡 주변 접근을 피하고 방송 안내에 따라 고지대로 이동하세요."
  },
  "한파": {
    icon: "❄️",
    summary: "따뜻하게 입고 수도관을 보호하세요",
    detail: "외출 시 보온에 신경 쓰고, 수도관 동파 예방 조치를 하세요."
  },
  "산불": {
    icon: "🔥",
    summary: "산림 인근 접근을 피하고 대피하세요",
    detail: "산불 발생 시 바람 반대 방향으로 대피하고 불씨 취급을 금하세요."
  }
};

// 문자열 파싱: "호우경보. 외출자제" → {type: "호우경보", warning: "외출자제"}
function parseDisasterMessage(message) {
  const [type, warning] = message.split(".");
  return {
    type: type?.trim(),
    warning: warning?.trim(),
  };
}

export default function DisasterScreen() {
  const [current, setCurrent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchEmergencyData(); // ✅ 실제 API
        if (result && result[0]?.body?.[0]?.MSTN_BRNE_CN) {
          const parsed = parseDisasterMessage(result[0].body[0].MSTN_BRNE_CN);
          setCurrent(parsed);
        }
      } catch (e) {
        console.error("API Error:", e);
      }
    }
    load();
  }, []);

  const openTip = (type) => {
    setSelectedTip({ ...disasterConfig[type], title: type });
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 재난 알림 */}
      {current && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>재난 알림</Text>
          <Text style={styles.icon}>{disasterConfig[current.type]?.icon || "⚠️"}</Text>
          <Text style={styles.title}>{current.type}</Text>
          <Text style={styles.warning}>{current.warning}</Text>
          <Text style={styles.summary}>{disasterConfig[current.type]?.summary}</Text>
          <TouchableOpacity style={styles.moreBtn} onPress={() => openTip(current.type)}>
            <Text style={styles.moreText}>자세히 보기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 하단 안전 행동 요령 */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>안전 행동 요령</Text>
        <View style={styles.grid}>
          {Object.keys(disasterConfig).map((key, idx) => (
            <TouchableOpacity key={idx} style={styles.tipButton} onPress={() => openTip(key)}>
              <Text style={styles.tipIcon}>{disasterConfig[key].icon}</Text>
              <Text style={styles.tipText}>{key} 시 대처 방법</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 팝업 Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalWrapper}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>{selectedTip?.icon}</Text>
            <Text style={styles.modalTitle}>{selectedTip?.title}</Text>
            <Text style={styles.modalDetail}>{selectedTip?.detail}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", padding: 20 },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#111" },
  icon: { fontSize: 42, textAlign: "center" },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginVertical: 8 },
  warning: { fontSize: 15, color: "#D32F2F", textAlign: "center", marginBottom: 4 },
  summary: { fontSize: 15, color: "#333", textAlign: "center" },

  moreBtn: {
    marginTop: 12,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  moreText: { color: "white", fontWeight: "600" },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  tipButton: {
    width: "47%", backgroundColor: "#F2F2F7", borderRadius: 14,
    padding: 16, marginVertical: 6, alignItems: "center"
  },
  tipIcon: { fontSize: 28, marginBottom: 6 },
  tipText: { fontSize: 15, fontWeight: "500", textAlign: "center" },

  modalWrapper: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalCard: {
    backgroundColor: "white", borderRadius: 20, padding: 24, width: "80%", alignItems: "center"
  },
  modalIcon: { fontSize: 42, marginBottom: 12 },
  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  modalDetail: { fontSize: 15, color: "#333", marginBottom: 16, textAlign: "center" },
  closeBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#007AFF", borderRadius: 10 },
  closeText: { color: "white", fontWeight: "600" }
});
