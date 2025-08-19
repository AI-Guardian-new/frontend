import React, { useState } from "react";
import { SafeAreaView } from 'react-native';
import KakaoMap from "../components/KakaoMap"; // components 폴더 기준
import KakaoMapWeb from '../components/KakaoMapWeb'; // components 폴더 기준
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ShelterScreen() {

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KEY&libraries=services"></script>
      <style>
        body, html { margin:0; padding:0; height:100%; }
        #map { width:100%; height:100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>

      <script>
        console.log('Kakao Map script 실행됨'); // 여기에 확인용 로그
        const mapContainer = document.getElementById('map');
        const mapOption = { center: new kakao.maps.LatLng(37.5665, 126.9780), level: 3 };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        const marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(37.5665, 126.9780) });
        marker.setMap(map);
      </script>
    </body>
    </html>
  `;

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
        <SafeAreaView style={styles.container}>
          {/* 서울 중심 좌표 예시 */}
          {/* <KakaoMap latitude={37.5665} longitude={126.9780} /> */}
          {/* <KakaoMapWeb latitude={37.5665} longitude={126.9780} /> */}
          <iframe
            srcDoc={htmlContent}
            style={{ width: '100%', height: '300px', border: 'none' }}
            title="KakaoMap"
          />
        </SafeAreaView>
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
  container: { 
    height: 300,
    width: "100%",
    backgroundColor: "#f9fafb",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
