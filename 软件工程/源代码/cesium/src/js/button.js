import { viewer } from "./main.js";


// 管理菜单显示隐藏控制
let manage = document.getElementById("manage");
let flag = true;
manage.onclick = function() {
  if (flag === true) {
    document.getElementById("graphTree").style.display = "none";
    flag = false;
  }else {
    document.getElementById("graphTree").style.display = "";
    flag = true;
  }
}

// Sentinel-2显示隐藏控制
let btn1 = document.getElementById("btn1");
btn1.style.color = '#a0d878';
let flag1 = true;
btn1.onclick = function() {
  if (flag1 === true) {
    layers[0].show = false;
    flag1 = false;
    btn1.style.color = '';
  }else {
    layers[0].show = true;
    flag1 = true;
    btn1.style.color = '#a0d878';
  }
}

// 地形显示隐藏控制
let btn2 = document.getElementById("btn2");
btn2.style.color = '#a0d878';
let flag2 = true;
btn2.onclick = function() {
  if (flag2 === true) {
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
    flag2 = false;
    btn2.style.color = '';
  }else {
    viewer.terrainProvider = Cesium.createWorldTerrain({
      requestWaterMask : true,
      requestVertexNormals : true
    });
    flag2 = true;
    btn2.style.color = '#a0d878';
  }
}

// 网格显示隐藏控制
let layers = viewer.imageryLayers._layers;
let btn3 = document.getElementById("btn3");
btn3.style.color = '#a0d878';
let flag3 = true;
btn3.onclick = function() {
  if (flag3 === true) {
    layers[1].show = false;
    flag3 = false;
    btn3.style.color = '';
  }else {
    layers[1].show = true;
    flag3 = true;
    btn3.style.color = '#a0d878';
  }
}

// 各州轮廓显示隐藏控制
let btn4 = document.getElementById("btn4");
btn4.style.color = '#a0d878';
let flag4 = true;
btn4.onclick = function() {
  if (flag4 === true) {
    viewer.dataSources._dataSources[0].show = false;
    flag4 = false;
    btn4.style.color = '';
  }else {
    viewer.dataSources._dataSources[0].show = true;
    flag4 = true;
    btn4.style.color = '#a0d878';
  }
}

// 3D建筑显示隐藏控制
let primit = viewer.scene.primitives
let flag5 = true;
let btn5 = document.getElementById("btn5");
btn5.style.color = '#a0d878';
btn5.onclick = function() {
  if (flag5 === true) {
    primit._primitives[0].show = false;
    flag5 = false;
    btn5.style.color = '';
  }else {
    primit._primitives[0].show = true;
    flag5 = true;
    btn5.style.color = '#a0d878';
  }
};

// 相机指向输入框显示隐藏控制
let btn6 = document.getElementById("btn6");
btn6.style.color = '#a0d878';
let flag6 = false;
btn6.onclick = function() {
  if (flag6 === true) {
    document.getElementById("camera_input").style.display = "";
    flag6 = false;
    btn6.style.color = '#a0d878';
  }else {
    document.getElementById("camera_input").style.display = "none";
    flag6 = true;
    btn6.style.color = '';
  }
}

// 太阳光照显示隐藏控制
let flag7 = true;
let btn7 = document.getElementById("btn7");
btn7.style.color = '#a0d878';
btn7.onclick = function() {
  if (flag7 === true) {
    viewer.scene.globe.enableLighting = false;
    flag7 = false;
    btn7.style.color = '';
  }else {
    viewer.scene.globe.enableLighting = true;
    flag7 = true;
    btn7.style.color = '#a0d878';
  }
}

// 深度检测显示与隐藏控制
let flag8 = true;
let btn8 = document.getElementById("btn8");
btn8.style.color = '#a0d878';
btn8.onclick = function() {
  if (flag8 === true) {
    viewer.scene.globe.depthTestAgainstTerrain = false;
    flag8 = false;
    btn8.style.color = '';
  }else {
    viewer.scene.globe.depthTestAgainstTerrain = true;
    flag8 = true;
    btn8.style.color = '#a0d878';
  }
}

// 飞机控制框显示隐藏控制
let btn9 = document.getElementById("btn9");
btn9.style.color = '#a0d878';
let flag9 = true;
btn9.onclick = function() {
  if (flag9 === true) {
    document.getElementById("toolbar").style.display = "none";
    flag9 = false;
    btn9.style.color = '';
  }else {
    document.getElementById("toolbar").style.display = "";
    flag9 = true;
    btn9.style.color = '#a0d878';
  }
}

// 标注输入框显示隐藏控制
let btn10 = document.getElementById("btn10");
btn10.style.color = '#a0d878';
let flag10 = false;
btn10.onclick = function() {
  if (flag10 === true) {
    document.getElementById("label_input").style.display = "";
    flag10 = false;
    btn10.style.color = '#a0d878';
  }else {
    document.getElementById("label_input").style.display = "none";
    flag10 = true;
    btn10.style.color = '';
  }
}
