import { viewer } from "./main.js";


// 美国各州区域轮廓矢量
viewer.dataSources.add(
  Cesium.GeoJsonDataSource.load(
    "../Apps/SampleData/ne_10m_us_states.topojson", {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK.withAlpha(0.5),
    strokeWidth: 3
  })
);

// 全球地理网格
let GridImagery= new Cesium.GridImageryProvider();
let imageryLayers = viewer.imageryLayers;
let GridImageryLayer = imageryLayers.addImageryProvider(GridImagery);//添加网格图层
imageryLayers.raiseToTop(GridImageryLayer);//将网格图层置顶
