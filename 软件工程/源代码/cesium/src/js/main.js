
// 获取令牌
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOi' +
  'JlMWIyZmE1OS0yMDllLTRjZGMtYTViZC0zMjRkN2ZiOTkyMzAiLCJpZCI6NzcwMzksImlhdCI6MTY' +
  'zOTk3Njg2OH0.720pLWQGif480Gqzat7gawCeSKOjoUr5g2u7Nb6kvCI';
export let viewer = new Cesium.Viewer('cesiumContainer', {
  navigationHelpButton: false,
  baseLayerPicker: false,
  geocoder: false
});