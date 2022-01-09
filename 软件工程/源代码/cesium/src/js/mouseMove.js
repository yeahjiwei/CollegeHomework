import { viewer } from "./main.js";


// 鼠标移动获取经纬度和相机高度
let canvas = viewer.scene.canvas;
let ellipsoid = viewer.scene.globe.ellipsoid;
let handler = new Cesium.ScreenSpaceEventHandler(canvas);

let longitude;
let latitude;
handler.setInputAction(function(movement) {
  let cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
  if (cartesian) {
    let cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
    // 将地图坐标（弧度）转为十进制的度数
    longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
    latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
    let camera_height = (viewer.camera.positionCartographic.height / 1000).toFixed(2);
    // 界面显示数据
    let llc = "经度：" + longitude + "° &nbsp;&nbsp;&nbsp;&nbsp;"+ "纬度：" + latitude +
      "° &nbsp;&nbsp;&nbsp;&nbsp;" + "  高度：" + camera_height + "m";
    $("#mouseMove").html(llc);
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

export {longitude, latitude};