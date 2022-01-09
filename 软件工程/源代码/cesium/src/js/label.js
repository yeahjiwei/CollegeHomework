import { viewer } from "./main.js";
import { longitude, latitude } from "./mouseMove.js";

let btn_label = document.getElementById("btn_label");
let pinBuilder = new Cesium.PinBuilder();
let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
btn_label.onclick = function() {
  let value1 = document.getElementById("label_input1").value;
  let value2 = document.getElementById("label_input2").value;
  let value3 = document.getElementById("label_input3").value;
  let value4 = document.getElementById("label_input4").value;

// 要素标注控制
  handler.setInputAction(function(click) {
    // 添加标签
    let questionPin;
    viewer.entities.remove(questionPin)
    questionPin = viewer.entities.add({
      name: "CUG-Labels",
      position: Cesium.Cartesian3.fromDegrees(Number(longitude), Number(latitude)),
      billboard: {
        image: pinBuilder.fromText(value1, Cesium.Color.BLACK, value2).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      label: {
        text: value3,
        font: value4 + 'px sans-serif',
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM + 1000
      }
    });
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

