import React from 'react';

export default function KakaoMapWeb({ latitude, longitude }) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KEY&libraries=services"></script>
        <style>
          body, html { margin:0; padding:0; height:100%; }
          #map { width:100%; height:100%; }
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
            }
          };
        </script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="KakaoMap"
      srcDoc={htmlContent}
      style={{ width: '100%', height: '300px', border: 'none' }}
    />
  );
}
