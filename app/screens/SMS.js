import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function DisasterAlert() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmergencyMessage() {
      try {
        const response = await axios.post(
          "http://35.216.111.224/message/emergency",
          {
            numOfRows: 1, // 최신 1개만
            pageNo: 1,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("API Response:", response.data);
        setMessage(response.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmergencyMessage();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>재난 알림</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>재난 알림</Text>
      {message ? (
        <ScrollView style={styles.messageBox}>
          <Text style={styles.alert}>⚠️ 재난 알림 도착</Text>
          <Text style={styles.content}>{JSON.stringify(message, null, 2)}</Text>
        </ScrollView>
      ) : (
        <Text>현재 알림이 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  alert: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 6,
  },
  messageBox: {
    maxHeight: 200,
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
});
