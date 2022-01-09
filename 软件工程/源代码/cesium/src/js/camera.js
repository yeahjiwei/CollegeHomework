import { viewer } from "./main.js";


let btn_fly = document.getElementById("btn_fly");
btn_fly.onclick = function() {
  let value1 = document.getElementById("camera_input1").value;
  let value2 = document.getElementById("camera_input2").value;
  let value3 = document.getElementById("camera_input3").value;

  let initialPosition = new Cesium.Cartesian3.fromDegrees(
    Number(value1), Number(value2), Number(value3));
  viewer.camera.flyTo({
    destination: initialPosition,
    orientation: {
      heading: Cesium.Math.toRadians(20.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0
    },
    duration: 2,
    maximumHeight: 10000,
    flyOverLongitude: 100,
    pitchAdjustHeight: 2000,
    endTransform: Cesium.Matrix4.IDENTITY,
    complete: function complete() {
      let z = (viewer.z || 90000) * 1.2 + 8000;// 到达位置后执行的回调函数
    }
  });
};
