// app/forms/mainboard.jsx
import { Redirect } from "expo-router";

export default function MainBoardRedirect() {
  // 앱이 mainboard에 들어오면 자동으로 /tabs/home 으로 이동
  return <Redirect href="/tabs/home" />;
}
