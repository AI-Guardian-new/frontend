import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

export default function SettingsScreen() {
  const [autoContact, setAutoContact] = useState(true);
  const [waitTime, setWaitTime] = useState(30);

  const [push, setPush] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* 보호자 섹션 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>등록된 보호자</Text>
          <Text style={styles.subText}>
            긴급상황 시 자동으로 연락될 보호자 목록
          </Text>

          {[
            { name: "어머니", phone: "010-1234-5678", main: true },
            { name: "아버지", phone: "010-2345-6789" },
            { name: "친구(민수)", phone: "010-3456-7890" },
          ].map((item, idx) => (
            <View key={idx} style={styles.guardianItem}>
              <Text style={styles.guardianName}>
                {item.name}{" "}
                {item.main && (
                  <Text style={styles.mainBadge}>주보호자</Text>
                )}
              </Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ 보호자 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 자동 연락 설정 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>자동 연락 설정</Text>
          <View style={styles.row}>
            <Text>자동 연락 활성화</Text>
            <Switch
              value={autoContact}
              onValueChange={setAutoContact}
              trackColor={{ false: "#ccc", true: "#3b82f6" }}
              thumbColor="white"
            />
          </View>
          <Text style={styles.subText}>대기 시간: {waitTime}초</Text>
          {/* RN에서는 Slider 패키지 사용 필요 → 예시만 */}
        </View>

        {/* 알림 설정 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>알림 설정</Text>

          {[
            { label: "푸시 알림", state: push, setter: setPush },
            { label: "소리 알림", state: sound, setter: setSound },
            { label: "진동 알림", state: vibration, setter: setVibration },
          ].map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text>{item.label}</Text>
              <Switch
                value={item.state}
                onValueChange={item.setter}
                trackColor={{ false: "#ccc", true: "#3b82f6" }}
                thumbColor="white"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 저장 버튼 */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>저장하기</Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  card: {
    backgroundColor: "white",
    margin: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  subText: { fontSize: 12, color: "#6b7280", marginBottom: 8 },
  guardianItem: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  guardianName: { fontWeight: "600" },
  mainBadge: {
    fontSize: 10,
    color: "#2563eb",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  phone: { fontSize: 12, color: "#374151" },
  addBtn: {
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    marginTop: 6,
  },
  addBtnText: { color: "#3b82f6", fontWeight: "500" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  saveBtn: {
    backgroundColor: "#3b82f6",
    padding: 16,
    alignItems: "center",
  },
  saveText: { color: "white", fontWeight: "600", fontSize: 16 },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "white",
  },
});
