import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from "react-native";

const baseFont = Platform.select({ ios: "System", android: "sans-serif", web: "system-ui" });

export default function Home() {
  return (
    <View style={s.container}>
      {/* 헤더 */}
      <View style={s.header}>
        <Text style={s.logo}>📢 AI Guardian</Text>
        <Text style={s.status}>📍 위치 활성화 · ✅ 안전</Text>
      </View>

      {/* 현재 지역 / 상황 */}
      <View style={s.card}>
        <Text style={s.location}>서울특별시 강남구</Text>
        <Text style={s.subText}>태풍 경보 발령 중</Text>
      </View>

      {/* 긴급 신고 버튼 */}
      <TouchableOpacity style={s.sosBtn} onPress={() => {}}>
        <Text style={s.sosText}>🚨 긴급 신고 (SOS)</Text>
      </TouchableOpacity>

      {/* 나는 안전합니다 버튼 */}
      <TouchableOpacity style={s.safeBtn} onPress={() => {}}>
        <Text style={s.safeText}>✅ 나는 안전합니다</Text>
      </TouchableOpacity>

      {/* 기능 버튼 2개 */}
      <View style={s.row}>
        <TouchableOpacity style={s.subBtn} onPress={() => {}}>
          <Text style={s.subText}>📍 대피소 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.subBtn} onPress={() => {}}>
          <Text style={s.subText}>👨‍👩‍👧 보호자 연락</Text>
        </TouchableOpacity>
      </View>

      {/* 최근 재난 알림 (화면 아래 전부 차지) */}
      <View style={[s.card, s.alertBox]}>
        <Text style={s.sectionTitle}>🔔 최근 재난 알림</Text>
        <ScrollView>
          <Text style={s.alert}>태풍 ‘하이선’ 경보 · 2시간 전 · 진행중</Text>
          <Text style={s.alert}>지진 감지 알림 · 완료</Text>
          <Text style={s.alert}>홍수주의보 · 1일 전 · 해제</Text>
          {/* 추후 알림이 늘어나면 자동 스크롤 */}
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: baseFont,
  },
  status: {
    fontSize: 14,
    color: "green",
    fontFamily: baseFont,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: baseFont,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    fontFamily: baseFont,
  },
  sosBtn: {
    backgroundColor: "#d32f2f",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  sosText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: baseFont,
  },
  safeBtn: {
    backgroundColor: "green",
    paddingVertical: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  safeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: baseFont,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  subBtn: {
    backgroundColor: "#eee",
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: baseFont,
  },
  alertBox: {
    flex: 1, // 화면의 남는 공간 전부 차지
  },
  alert: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: baseFont,
  },
});
