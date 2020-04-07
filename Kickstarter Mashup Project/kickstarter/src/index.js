import lineData from './qlik/hypercubes/lineData';
import lineChart from './qlik/objects/lineChart';
import kpiData from './qlik/hypercubes/kpiData';
import kpiObject from './qlik/objects/kpiObject';
import trendData from './qlik/hypercubes/trendData';
import trendChart from './qlik/objects/trendChart';
import getApp from './qlik/app';

var nightmode = "off";
var color = "var(--text-light)";

//Last reload time
getApp.then(app => {
  app.getAppProperties().then(props => {
    $('#sub-header').html('')
    $('#sub-header').html('Data refreshed as of ' + props.qLastReloadTime)
  })
})

//Nav
$(() => {
  $(".drawer-nav").on("click", function() {
    $("#right-section").toggleClass("collapsed");
    $(".sidebar span").toggle();

    lineRender.init(color)
    trendRender.init(color)
  });

  //NightMode Toggle
  $(".nightmode").on("click", function() {

    nightmode == 'off' ? nightmode = 'on' : nightmode = 'off';
    nightmode == 'on' ? color = 'var(--text-dark)' : color = 'var(--text-light)';

    $("#left-section").toggleClass("night");
    $("#nav").toggleClass("night");
    $("#bottom-right").toggleClass("night");
    $("#chart-wrapper").toggleClass("night");
    $("#right-box").toggleClass("night");
    $(".kpi").toggleClass("night");
    $("#trend-container").toggleClass("night");

    lineRender.init(color)
    trendRender.init(color)
  });
});

$( window ).resize(function(){
  lineRender.init(color)
  trendRender.init(color)
})

let lineRender = new lineChart(lineData)
let kpiRender = new kpiObject(kpiData)
let trendRender = new trendChart(trendData)

Promise.all([lineData.open(),kpiData.open(), trendData.open()]).then(() => {
  lineRender.init(color)
  kpiRender.init()
  trendRender.init(color)
})

$("#chart-year").on("click", function(){
  Promise.all([lineData.patchYear()]).then(() => {
    lineRender.init()
  })
})

$("#chart-category").on("click", function(){
  Promise.all([lineData.patchCategory()]).then(() => {
    lineRender.init()
  })
})


