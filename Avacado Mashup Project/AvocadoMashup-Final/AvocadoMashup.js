var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);

var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:"
};

require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources"
});

var selection = [];
var selectedDim;
var models = [];

require(["js/qlik","charts/scatter.js","charts/bar.js","charts/line.js","charts/pie.js"], function(qlik) {
  qlik.setOnError(function(error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });
  $("#closePopup").click(function() {
    $("#popup").hide();
  });

  $("#selections").click(function() {
    app.field(selectedDim).select(selection.params[2], false, false);
    selection = [];
  });

  //open apps -- inserted here --
  var app = qlik.openApp("AVOCADO PRICES.qvf", config);

  //get selections list and render build on change
  app.getList("CurrentSelections", function() {
    build();
  });

  //get objects -- inserted here --
  app.getObject("CurrentSelections", "CurrentSelections");

  //Set initial tab value
  var tab = "Overview";

  //Re-render on tab change
  $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function() {
    tab = $(this).text();
    console.log(tab);
    build()
  });

  //Build App
  function build() {
    switch (tab) {
      case "Overview":
        buildOverview();
        break;
      case "Trends":
        buildTrends();
        break;
      default:
    }
  }

  //Build Overview tab
  async function buildOverview() {
    //clear HyperCubes
    cleanup();
    //build charts
    const [bar, scatter, pie] = await Promise.all([
      createBar(app),
      createScatter(app),
      createPie(app)
    ]);
    scatter.brush("lasso-example").link(bar.brush("range"));
    bar.brush("range").link(scatter.brush("lasso-example"));
    pie.brush("highlight").link(scatter.brush("lasso-example"));
    bar.brush("range").link(pie.brush("highlight"));
  }

  //Build Trends Tab
  function buildTrends() {
    cleanup();
    createLine(app);
  }

  //Cleanup
  function cleanup() {
    console.log("models: ", models);
    $.each(models, function(i, e) {
      e.close;
    });
    models = [];
  }
});
