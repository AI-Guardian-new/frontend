// app/screens/EmergencyScreen.jsx
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchEmergencyData } from "../api/emergency.js"; // api 함수 불러오기

export default function EmergencyScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
        console.log("r--------------------------------------------")
      const result = await fetchEmergencyData();
      console.log (result)
      setData(result);
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 긴급 메시지</Text>
      {data ? (
        <FlatList
          data={data.items} // ⚠️ 실제 응답 구조 확인 필요
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text> // ⚠️ 응답 구조에 맞게 필드명 수정 필요
          )}
        />
      ) : (
        <Text>데이터 불러오는 중...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
