import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ShelterScreen() {
  const [shelters] = useState([
    {
      name: "서울시청 긴급대피소",
      status: "운영중",
      address: "서울특별시 중구 세종대로 110",
      current: 320,
      capacity: 500,
    },
    {
      name: "강남구청 의료센터",
      status: "운영중",
      address: "서울특별시 강남구 테헤란로 426",
      current: 150,
      capacity: 200,
    },
    {
      name: "용산구 주민센터",
      status: "운영중",
      address: "서울특별시 용산구 한남대로 72",
      current: 80,
      capacity: 150,
    },
  ]);

  return (
    <View style={styles.container}>
      {/* 지도 영역 */}
      <View style={styles.mapBox}>
        <Text style={{ color: "#6b7280" }}>지도 로딩 중…</Text>
        <Text style={{ color: "#6b7280" }}>Google Maps API 연동 필요</Text>
      </View>

      {/* 대피소 리스트 */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={styles.sectionTitle}>📍 주변 대피소 (3곳)</Text>

        {shelters.map((s, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{s.name}</Text>
              <Text style={styles.badge}>{s.status}</Text>
            </View>
            <Text style={styles.address}>{s.address}</Text>
            <Text style={styles.people}>
              {s.current} / {s.capacity}명
            </Text>
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>길찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn}>
                <Text style={styles.outlineBtnText}>연락</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 네비게이션 */}
      <View style={styles.navbar}>
        <Text style={styles.navItem}>🏠 홈</Text>
        <Text style={[styles.navItem, styles.active]}>🗺️ 지도</Text>
        <Text style={styles.navItem}>⚠️ 재난정보</Text>
        <Text style={styles.navItem}>⚙️ 설정</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  mapBox: {
    height: 150,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 15, fontWeight: "600" },
  badge: {
    fontSize: 12,
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  address: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  people: { marginTop: 4, fontSize: 13 },
  btnRow: { flexDirection: "row", marginTop: 10, gap: 8 },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  primaryBtnText: { color: "white", fontWeight: "600" },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  outlineBtnText: { color: "#3b82f6", fontWeight: "600" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "white",
  },
  navItem: { color: "#6b7280", fontSize: 13 },
  active: { color: "#2563eb", fontWeight: "600" },
});
