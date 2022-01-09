import { viewer } from "./main.js";


// 设置随机数种子以获得一致的结果
Cesium.Math.setRandomNumberSeed(3);

// 设置模拟时间的界限
let start = Cesium.JulianDate.fromDate(new Date(2021, 12, 20, 16));
let stop = Cesium.JulianDate.addSeconds(
  start,
  360,
  new Cesium.JulianDate()
);

// 确保查看器处于所需时间
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
viewer.clock.multiplier = 10;
// 将时间轴设置为模拟边界
viewer.timeline.zoomTo(start, stop);

// 生成具有不同高度的随机圆形图案
function computeCirclularFlight(lon, lat, radius) {
  let property = new Cesium.SampledPositionProperty();
  for (let i = 0; i <= 360; i += 45) {
    let radians = Cesium.Math.toRadians(i);
    let time = Cesium.JulianDate.addSeconds(
      start,
      i,
      new Cesium.JulianDate()
    );
    let position = Cesium.Cartesian3.fromDegrees(
      lon + radius * 1.5 * Math.cos(radians),
      lat + radius * Math.sin(radians),
      Cesium.Math.nextRandomNumber() * 500 + 1750
    );
    property.addSample(time, position);

    // 为生成的每个样本创建一个点
    let flight = viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.TRANSPARENT,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
      },
    });
  }
  return property;
}

// 计算实体位置属性
let position = computeCirclularFlight(-73.998, 40.774, 0.03);
// 实际创建实体
let entity = viewer.entities.add({
  // 将实体可用性设置为与模拟时间相同的间隔
  availability: new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({
      start: start,
      stop: stop,
    }),
  ]),
  // 使用我们计算出的位置
  position: position,
  // 根据位置移动自动计算方向
  orientation: new Cesium.VelocityOrientationProperty(position),
  // 加载 Cesium 平面模型来表示实体
  model: {
    uri: "../../Apps/SampleData/models/CesiumAir/Cesium_Air.glb",
    minimumPixelSize: 64,
  },
  // 将路径显示为以 1 秒为增量采样的线
  path: {
    resolution: 1,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.1,
      color: Cesium.Color.YELLOW,
    }),
    width: 10,
  },
});

// 添加按钮从上到下查看路径
Sandcastle.addDefaultToolbarButton("俯视观察", function () {
  viewer.trackedEntity = undefined;
  viewer.zoomTo(
    viewer.entities,
    new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
  );
},  );

// 添加按钮从侧面查看路径
Sandcastle.addToolbarButton("侧视观察", function () {
  viewer.trackedEntity = undefined;
  viewer.zoomTo(
    viewer.entities,
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(-90),
      Cesium.Math.toRadians(-15),
      7500
    )
  );
}, );

// 添加按钮以在实体移动时对其进行跟踪
Sandcastle.addToolbarButton("飞机视角", function () {
  viewer.trackedEntity = entity;
}, );

// 添加用于选择每种插值模式的组合框
Sandcastle.addToolbarMenu(
  [
    {
      text: "插值：线性近似",
      onselect: function () {
        entity.position.setInterpolationOptions({
          interpolationDegree: 1,
          interpolationAlgorithm: Cesium.LinearApproximation,
        });
      },
    },
    {
      text: "插值：拉格朗日多项式近似",
      onselect: function () {
        entity.position.setInterpolationOptions({
          interpolationDegree: 5,
          interpolationAlgorithm:
          Cesium.LagrangePolynomialApproximation,
        });
      },
    },
    {
      text: "插值：厄米多项式近似",
      onselect: function () {
        entity.position.setInterpolationOptions({
          interpolationDegree: 2,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
        });
      },
    },
  ],
  "interpolationMenu"
);
