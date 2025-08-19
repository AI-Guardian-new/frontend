import axios from "axios";

export async function fetchEmergencyData() {
  try {
    const response = await axios.post("http://35.216.111.224/message/emergency", 
       {
        numOfRows: 10,
        pageNo: 1,
      },

      {
      headers: {
        "Content-Type": "application/json",
      },

      }
    );

    //console.log("✅ API 응답(data):", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("❌ API 호출 에러:", error);
    return null;
  }
}
