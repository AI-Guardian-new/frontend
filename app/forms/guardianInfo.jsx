import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiText, MotiView } from 'moti';

const baseFont = Platform.select({ ios: 'System', android: 'sans-serif', web: 'system-ui' });
const { width } = Dimensions.get('window');

export default function GuardianInfo() {
  const router = useRouter();

  return (
    <View style={s.container}>
      {/* 안내 문구 */}
      <View style={s.textBox}>
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={s.text}
          lineBreakStrategyIOS="hangul-word" // ✅ iOS 한국어 줄바꿈
        >
          비상시 연결할 당신의 보호자 연락처를 입력해주세요
        </MotiText>
      </View>

      {/* 버튼 */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 200 }}
        style={{ width: '100%' }}
      >
        <TouchableOpacity style={s.btn} onPress={() => router.push('/forms/guardianForm')}>
          <Text style={s.btnText}>다음</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: baseFont,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
    flexWrap: 'wrap',        // ✅ Android 줄바꿈 허용
    includeFontPadding: false, // ✅ Android 위아래 패딩 제거
    maxWidth: width - 48,    // 화면 너비 제한
    color: '#111111',
  },
  btn: {
    backgroundColor: '#000000',
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: baseFont,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
