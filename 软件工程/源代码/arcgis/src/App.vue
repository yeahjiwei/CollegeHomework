<template>
  <div id="app">
    <div id="home"></div>
    <div id="search"></div>
    <div id="locate"></div>
    <div id="zoom"></div>
    <div id="basemapGallery"></div>
    <div id="coordinateConversion"></div>
    <button id="btn" @click="btnClick">{{disp}}画廊</button>
  </div>
</template>

<script>
import {loadModules} from  'esri-loader';
export default  {
  name: 'App',
  data() {
    return {
       options : {
        url: 'https://js.arcgis.com/4.22/',
        css: 'https://js.arcgis.com/4.22/esri/themes/light/main.css'
      },
      disp: "展开",
      isDisp: false
    }
  },
  components: {

  },
  methods: {
    //创建二维场景
    createMapView() {

      loadModules(["esri/Map", "esri/views/MapView","esri/widgets/Home",
        "esri/widgets/Legend", "esri/widgets/ScaleBar", "esri/widgets/Zoom",
        "esri/widgets/Search", "esri/widgets/BasemapGallery",
        "esri/widgets/CoordinateConversion", "esri/widgets/Locate"], this.options)
          .then(([Map, MapView, Home, Legend, ScaleBar, Zoom, Search,
                   BasemapGallery, CoordinateConversion, Locate]) => {

        // 地图映射实例
        const map = new Map({
          basemap: "streets"
        });
        // 二维视图
        const view = new MapView({
          container: "app",
          map: map ,
          zoom: 5,
          center: [110.15 ,35.03],
        });
        // 清空自带控件
        view.ui.components = [];

        // 主视图控件
        const homeWidget = new Home({
          view: view
        }, "home");
        view.ui.add(homeWidget);
        // 比例尺控件
        const scaleBar = new ScaleBar({
          view: view,
          unit: 'metric'
        });
        view.ui.add(scaleBar, "bottom-left");
        // 放大缩小控件
        const zoom = new Zoom({
          view: view
        }, "zoom");
        view.ui.add(zoom, "bottom-right");
        // 搜索框控件
        const search = new Search({
          view: view
        }, "search");
        view.ui.add(search);
        // 画廊控件
        const basemapGallery = new BasemapGallery({
          view: view,
        }, "basemapGallery");
        view.ui.add(basemapGallery);
        // 坐标控件
        const coordinateConversion = new CoordinateConversion({
          view: view
        }, "coordinateConversion");
        view.ui.add(coordinateConversion);
        // 定位控件
        const locate = new Locate({
          view: view
        }, "locate");
        view.ui.add(locate);

      }).catch(err => {
        console.log('地图创建失败，'+ err);
      });
    },
    // 画廊点击隐藏事件
    btnClick() {
      const className =  document.getElementsByClassName
      ("esri-component esri-basemap-gallery esri-widget esri-widget--panel-height-only");
      for (let i = 0 ; i < className.length ; i++) {
        className[i].style.display = "none";
      }

      if (this.isDisp === false) {
        this.disp = "收起";
        this.isDisp = true;
        for (let i = 0 ; i < className.length ; i++) {
          className[i].style.display = "block";
        }
      }else {
        this.disp = "展开";
        this.isDisp = false;
        for (let i = 0 ; i < className.length ; i++) {
          className[i].style.display = "none";
        }
      }
    }
  },
  mounted() {
    this.createMapView();
    this.btnClick();
  }
}
</script>

<style>
body {
  margin: 0 !important;
}
/*去除mapview拖动时的边框*/
.esri-view .esri-view-surface--inset-outline:focus::after {
  outline: auto 0px Highlight !important;
  outline: auto 0px -webkit-focus-ring-color !important;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
#home {
  position: absolute;
  bottom: 117px;
  right: 15px;
}
#search {
  position: absolute;
  top: 15px;
  left: 115px;
}
#search-input {
  width: 400px;
  border-radius: 10px 0 0 10px;
}
.esri-search__submit-button {
  border-radius: 0 10px 10px 0!important;
  background: linear-gradient(to bottom, #134E5E, #71B280) !important;
}
.esri-widget--button {
  background: linear-gradient(to bottom, #134E5E, #71B280) !important;
  border-radius: 10px;
}
#locate {
  position: absolute;
  bottom: 82px;
  right: 15px;
}
#zoom {
  border-radius: 10px!important;
  background: linear-gradient(to bottom, #134E5E, #71B280) !important;
}
#btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 100px;
  height: 30px;
  font-size: 18px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(to bottom, #134E5E, #71B280) !important;
}
#basemapGallery {
  position: absolute;
  top: 50px;
  right: 15px;
  width: 100px;
  height: 300px;
  border-radius: 10px 0 0 10px;
}
#coordinateConversion {
  position: absolute;
  bottom: 15px;
  left: 35%;
  border-radius: 10px !important;
}

</style>
