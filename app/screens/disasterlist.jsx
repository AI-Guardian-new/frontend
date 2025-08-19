import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

// ---------------------------
// ✅ 더미데이터 (백엔드 연결되면 교체)
// ---------------------------
const dummyDisaster = {
  type: "태풍",
  message: "서울 전역 강풍 주의보 발효 중",
  icon: "🌪️",
};

const dummyWeather = {
  temp: "28℃",
  wind: "12m/s",
  rain: "30mm",
};

const dummyNews = [
  { id: 1, title: "서울 도심 도로 침수, 차량 통제 중", url: "https://news.naver.com" },
  { id: 2, title: "강풍 피해로 전신주 쓰러짐…정전 발생", url: "https://news.naver.com" },
  { id: 3, title: "기상청, 내일까지 강풍·호우 지속 전망", url: "https://news.naver.com" },
];

// ✅ 안전 행동요령 카드용 더미 리스트
const safetyTips = [
  { id: "earthquake", name: "지진" },
  { id: "typhoon", name: "태풍" },
  { id: "heatwave", name: "폭염" },
  { id: "snowstorm", name: "폭설" },
  { id: "wildfire", name: "산불" },
  { id: "flood", name: "홍수" },
];

export default function DisasterInfoScreen() {
  const [disaster, setDisaster] = useState(null);
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const router = useRouter();

  // ---------------------------
  // ✅ 데이터 fetch (지금은 더미, 나중에 백엔드 연결)
  // ---------------------------
  useEffect(() => {
    setDisaster(dummyDisaster);
    setWeather(dummyWeather);
    setNews(dummyNews);
  }, []);

  return (
    <ScrollView style={s.container}>
      {/* -------------------- */}
      {/* ✅ 현재 재난 카드 */}
      {/* -------------------- */}
      {disaster && (
        <View style={s.card}>
          <Text style={s.cardIcon}>{disaster.icon}</Text>
          <View>
            <Text style={s.cardTitle}>{disaster.type}</Text>
            <Text style={s.cardMsg}>{disaster.message}</Text>
          </View>
        </View>
      )}

      {/* -------------------- */}
      {/* ✅ 기상청 데이터 */}
      {/* -------------------- */}
      {weather && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>기상청 정보</Text>
          <Text style={s.weatherData}>🌡️ 기온: {weather.temp}</Text>
          <Text style={s.weatherData}>💨 풍속: {weather.wind}</Text>
          <Text style={s.weatherData}>🌧️ 강수량: {weather.rain}</Text>
        </View>
      )}

      {/* -------------------- */}
      {/* ✅ 뉴스 3줄 */}
      {/* -------------------- */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>실시간 뉴스</Text>
        {news.slice(0, 3).map((item) => (
          <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.url)}>
            <Text style={s.newsItem}>• {item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* -------------------- */}
      {/* ✅ 안전 행동요령 카드 */}
      {/* -------------------- */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>안전 행동요령</Text>
        <View style={s.grid}>
          {safetyTips.map((tip) => (
            <TouchableOpacity
              key={tip.id}
              style={s.tipCard}
              onPress={() => router.push(`/safety/${tip.id}`)} // 👉 개별 상세 페이지 이동
            >
              <Text style={s.tipText}>{tip.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ---------------------------
// ✅ 스타일
// ---------------------------
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  // 현재 재난 카드
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardIcon: { fontSize: 40, marginRight: 12 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#111" },
  cardMsg: { fontSize: 14, color: "#444", marginTop: 4 },

  // 공통 섹션
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: "#111" },

  // 기상청 데이터
  weatherData: { fontSize: 16, marginBottom: 4 },

  // 뉴스
  newsItem: { fontSize: 15, marginBottom: 6, color: "#007bff" },

  // 안전 행동요령 카드
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  tipCard: {
    width: "48%",
    backgroundColor: "#f1f3f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  tipText: { fontSize: 16, fontWeight: "600", color: "#111" },
});
