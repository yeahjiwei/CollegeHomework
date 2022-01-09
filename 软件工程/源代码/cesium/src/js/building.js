import { viewer } from "./main.js";


// 加载建筑
let city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(96188)
  }));
// 调整图块集高度，使其不会漂浮在地形上方
  let heightOffset = -32;
  city.readyPromise.then(function(tileset) {
    // 瓦片集位置
    let boundingSphere = tileset.boundingSphere;
    let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  });

// 选中建筑物描述轮廓图
  let selected = {
    feature: undefined,
    originalColor: new Cesium.Color()
  };

// 如果支持剪影，则鼠标上方的剪影功能为青色
// 如果不支持剪影，请将特征颜色更改为鼠标悬停时为黄色
  if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
    let silhouetteAqua = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteAqua.uniforms.color = Cesium.Color.AQUA;
    silhouetteAqua.uniforms.length = 0.01;
    silhouetteAqua.selected = [];

    let silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
    silhouetteGreen.uniforms.color = Cesium.Color.LIME;
    silhouetteGreen.uniforms.length = 0.01;
    silhouetteGreen.selected = [];

    viewer.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createSilhouetteStage([
        silhouetteAqua,
        silhouetteGreen
      ])
    );

    // 在悬停时勾勒出轮廓
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      // 如果先前高亮显示了某个要素，请撤消该高亮显示
      silhouetteAqua.selected = [];
      // 点击新要素
      let pickedFeature = viewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedFeature)) {
        return;
      }
      // 突出显示尚未选定的功能
      if (pickedFeature !== selected.feature) {
        silhouetteAqua.selected = [pickedFeature];
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  } else {
    let highlighted = {
      feature: undefined,
      originalColor: new Cesium.Color()
    };

    // 鼠标移动显示黄色
    viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
      // 如果先前高亮显示了某个要素，请撤消该高亮显示
      if (Cesium.defined(highlighted.feature)) {
        highlighted.feature.color = highlighted.originalColor;
        highlighted.feature = undefined;
      }
      // 点击新要素
      let pickedFeature = viewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(pickedFeature)) {
        return;
      }
      // 如果尚未选择该功能，请突出显示该功能
      if (pickedFeature !== selected.feature) {
        highlighted.feature = pickedFeature;
        Cesium.Color.clone(
          pickedFeature.color,
          highlighted.originalColor
        );
        pickedFeature.color = Cesium.Color.YELLOW;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
