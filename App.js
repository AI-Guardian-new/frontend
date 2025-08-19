import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { fetchEmergencyData } from "./app/api/emergency.js"; 

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchEmergencyData();
      console.log("✅ 최종 데이터 구조:", result); // 응답 구조 확인
      if (result) {
        // ⚠️ 여기서 구조에 맞게 바꿔야 함
        setData(result.items || result.response?.body?.items || []);
      }
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 긴급 메시지</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.title || item.msg || JSON.stringify(item)}
            </Text>
          )}
        />
      ) : (
        <Text>데이터 불러오는 중...</Text>
      )}
      <StatusBar style="auto" />
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
