//Nav
$(() => {
  $(".drawer-nav").on("click", function() {
    $("#right-section").toggleClass("collapsed");
    $(".sidebar span").toggle();
  });

  //NightMode Toggle
  $(".nightmode").on("click", function() {
    $("#left-section").toggleClass("night");
    $("#nav").toggleClass("night");
    $("#bottom-right").toggleClass("night");
    $("#chart-wrapper").toggleClass("night");
    $("#right-box").toggleClass("night");
    $(".kpi").toggleClass("night");
    $("#trend-container").toggleClass("night");
  });
});
