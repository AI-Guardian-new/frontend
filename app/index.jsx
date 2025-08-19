import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { MotiText, MotiView } from 'moti';   
import axios from 'axios';
const baseFont = Platform.select({ ios: 'System', android: 'sans-serif', web: 'system-ui' });


export default function StartScreen() {
  
  async function test() {

    const asset = await axios.post("35.216.111.224/message/emergency", {
      "numOfRows": 10,
      "pageNo": 1

    }).then(res => console.log(res));

  }
  async function post() {
    try {
        const response = await axios.post("http://35.216.111.224/message/emergency", {
                "numOfRows": 100,
                "pageNo": 1
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log('POST:', response)
        return response;
    } catch (error) {
        console.error(error);
        return null
    }
} 
post();

  console.log (test ());
  return (
    <View style={s.container}>
      {/* 문구 애니메이션 */}
      <View style={s.textBox}>
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={s.hero}
        >
          재난 발생 시 ,{'\n'}당신의 안전을 돕습니다
        </MotiText>
      </View>

      {/* 버튼 애니메이션 */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}    // 처음: 안 보이고 아래쪽
        animate={{ opacity: 1, translateY: 0 }}  // 끝: 보이고 제자리
        transition={{ type: 'timing', duration: 600, delay: 200 }} 
        // delay: 문구 뜨고 0.5초 후 버튼 등장
        style={{ width: '100%' }}
      >
        <TouchableOpacity style={s.btn} onPress={() => router.push('/forms/guardianInfo')}>
          <Text style={s.btnText}>시작하기</Text>
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
  },
  hero: {
    fontFamily: baseFont,
    color: '#111111',
    fontSize: 28,
    lineHeight: 38,
    fontWeight: '700',
    textAlign: 'center',
    maxWidth: 320,
  },
  btn: {
    backgroundColor: '#000000',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 0,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: baseFont,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
