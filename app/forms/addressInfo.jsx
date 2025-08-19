import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MotiText, MotiView } from 'moti';
import { useRouter } from 'expo-router';

const baseFont = Platform.select({ ios: 'System', android: 'sans-serif', web: 'system-ui' });

export default function AddressInfo() {
  const router = useRouter();

  return (
    <View style={s.container}>
      {/* 안내 문구 */}
      <View style={s.textBox}>
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={s.hero}
          lineBreakStrategyIOS="hangul-word" // ✅ iOS 한국어 줄바꿈
          ellipsizeMode="clip"               // ✅ Android 잘림 방지
          numberOfLines={0}                  // 무제한 줄바꿈
        >
          당신의 주소를 알려주세요{'\n'}
          비상시 근처 대피소를 안내해드립니다
        </MotiText>
      </View>

      {/* 입력 버튼 */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 200 }}
        style={{ width: '100%' }}
      >
        <TouchableOpacity style={s.btn} onPress={() => router.push('/forms/addressForm')}>
          <Text style={s.btnText}>입력하기</Text>
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
    paddingHorizontal: 12,
  },
  hero: {
    fontFamily: baseFont,
    color: '#111111',
    fontSize: 22,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
    flexWrap: 'wrap',
    includeFontPadding: false, // ✅ Android 패딩 제거
    textAlignVertical: 'center',
    maxWidth: 600,
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
