import {viewer} from "./main.js";


// 移除默认图层
viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
// 添加 Sentinel-2 图层
viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({assetId : 3954}));
// 加载 WorldTerrain 地形
viewer.terrainProvider = Cesium.createWorldTerrain({
  requestWaterMask : true,
  requestVertexNormals : true
});
// 打开深度检测，那么在地形以下的对象不可见
viewer.scene.globe.depthTestAgainstTerrain = true;
// 太阳位置光照
viewer.scene.globe.enableLighting = true;
