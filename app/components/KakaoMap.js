import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_MAP_JS_KEY } from '@env';

export default function KakaoMap({ latitude, longitude }) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          window.onload = function() {
            if (typeof kakao !== 'undefined' && kakao.maps) {
              const mapContainer = document.getElementById('map');
              const mapOption = {
                center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                level: 3
              };
              const map = new kakao.maps.Map(mapContainer, mapOption);

              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(${latitude}, ${longitude})
              });
              marker.setMap(map);
            } else {
              console.error('Kakao Maps is not available');
            }
          };
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  webview: {
    flex: 1,
  },
});
