import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function DisasterUI() {
  const [selected, setSelected] = useState(null);

  // 재난 행동 요령 데이터 (리스트 구조)
  const disasterTips = {
    지진: [
      "흔들릴 때: 탁자 아래 들어가 몸과 머리를 보호, 탁자 다리 잡기.",
      "흔들림 멈춘 후: 전기·가스 차단 → 문 열어 출구 확보.",
      "대피 시: 계단 이용, 엘리베이터 사용 금지.",
      "야외: 건물에서 멀리 떨어져 넓은 공간(운동장·공원)으로 대피.",
      {
        title: "특수 상황",
        sub: [
          "엘리베이터 안 → 모든 층 버튼 누르고 열린 층에서 하차.",
          "운전 중 → 도로 오른쪽 정차, 키 꽂은 채 대피.",
        ],
      },
    ],
    한파: [
      "외출 시: 내복·목도리·장갑 착용, 보폭 줄이고 미끄럼 방지 신발 착용.",
      "증상 발생: 저체온·동상 의심 시 즉시 병원 이동.",
      "가정: 수도관·계량기 보온, 장시간 외출 시 이웃에게 알리기.",
      "차량: 저속 운전, 체인·비상용품 구비, 고립 시 차량 내에서 체온 유지.",
    ],
    태풍: [
      "외출 금지: 기상 상황 수시 확인, 침수지역·지하차도·하천 접근 금지.",
      "집 안: 창문·문 닫기, 유리 근처 피하기, 가스 차단, 전기시설 손대지 않기.",
      "정전 시: 양초 대신 손전등 사용.",
      "대피 필요 시: 노약자·어린이·장애인과 함께 신속히 이동.",
      "운전 중: 저속 주행, 급브레이크·급가속 피하기.",
    ],
    폭염: [
      "외출 자제: 부득이 외출 시 모자·가벼운 옷, 물 휴대.",
      "수분 보충: 물 충분히, 카페인·술 피하기.",
      "실내: 햇볕 가리기, 환기 유지.",
      "위험 신호: 현기증·구토·근육경련 → 시원한 곳 이동, 물 천천히 섭취.",
      "취약계층: 독거노인·어린이·환자 수시 확인.",
    ],
    홍수: [
      "예보 시: 대피 장소·경로 미리 숙지.",
      "발생 시: 높은 곳으로 신속 대피, 침수된 도로·지하차도 절대 진입 금지.",
      "집 안: 전기·가스 차단.",
      "대피소 도착 후: 도착 사실 알리고 안내에 따라 행동.",
      "침수 주택 복귀 전: 가스·전기 안전 점검 후 입실.",
    ],
    산불: [
      "평소: 쓰레기·부산물 소각 금지, 화기 사용 후 완전 소화.",
      "발생 시: 안내 방송·재난문자 확인 → 신속히 산과 멀리 떨어진 안전한 장소로 이동.",
      {
        title: "대피",
        sub: [
          "어린이 → 손 꼭 잡고 함께 이동.",
          "노약자·장애인 → 보호자와 동행, 도움 요청.",
        ],
      },
      "집 안: 창문·문 닫기, 가연성 물질 치우기, 비상용품 챙겨 대피.",
      "귀가 후: 불씨 없는지 확인, 위험 시 즉시 신고.",
    ],
  };

  const disasters = [
    { key: "지진", emoji: "🌏" },
    { key: "한파", emoji: "❄️" },
    { key: "태풍", emoji: "🌀" },
    { key: "폭염", emoji: "☀️" },
    { key: "홍수", emoji: "🌊" },
    { key: "산불", emoji: "🔥" },
  ];

  const renderTips = (tips) =>
    tips.map((tip, idx) => {
      if (typeof tip === "string") {
        return (
          <Text key={idx} style={styles.tipText}>
            {idx + 1}. {tip}
          </Text>
        );
      } else if (typeof tip === "object") {
        return (
          <View key={idx} style={{ marginTop: 8 }}>
            <Text style={styles.subTitle}>{idx + 1}. {tip.title}:</Text>
            {tip.sub.map((s, i) => (
              <Text key={i} style={styles.subText}>- {s}</Text>
            ))}
          </View>
        );
      }
    });

  return (
    <View style={styles.container}>
      {/* 상단 - 재난 알림 */}
      <View style={styles.card}>
        <Text style={styles.title}>재난 알림</Text>
        <Text style={styles.text}>현재 알림이 없습니다.</Text>
      </View>

      {/* 중간 - 뉴스 티커 */}
      <View style={styles.card}>
        <Text style={styles.title}>📢 재난 뉴스</Text>
        <Text style={styles.text}>
          [YTN] 전국 폭염 경보 발령 — [KBS] 태풍 북상, 주의 필요 — [연합뉴스] 홍수 위험 지역 긴급 대피
        </Text>
      </View>

      {/* 하단 - 재난 카드 */}
      <View style={styles.grid}>
        {disasters.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.disasterCard}
            onPress={() => setSelected(item.key)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardText}>{item.key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 팝업 */}
      <Modal visible={selected !== null} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {disasters.find((d) => d.key === selected)?.emoji} {selected} 행동 요령
              </Text>
              {renderTips(disasterTips[selected] || [])}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setSelected(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  text: { fontSize: 14, color: "#333", lineHeight: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  disasterCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 32, marginBottom: 8 },
  cardText: { fontSize: 16, fontWeight: "600" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  tipText: { fontSize: 15, lineHeight: 24, marginBottom: 6 },
  subTitle: { fontSize: 15, fontWeight: "600", marginTop: 6, marginBottom: 4 },
  subText: { fontSize: 14, lineHeight: 22, marginLeft: 16 },
  closeButton: {
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeText: { color: "#fff", fontSize: 14 },
});
