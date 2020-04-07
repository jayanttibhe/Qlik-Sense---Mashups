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

var app;

var appRequire = require.config({
  context: "appRequire",
  baseUrl: "./",
  paths: {
    jquery: "https://code.jquery.com/jquery-3.3.1.min",
    jqueryui: "https://code.jquery.com/ui/1.12.1/jquery-ui.min",
    bootstrap:
      "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min",
    bootstrapSelect:
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min"
  },
  shim: {
    jqueryui: {
      deps: ["jquery"]
    },
    bootstrap: {
      deps: ["jquery", "jqueryui"]
    },
    bootstrapSelect: {
      deps: ["jquery", "jqueryui", "bootstrap"]
    }
  }
});

require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources"
});

require(["js/qlik"], function(qlik) {
  //callbacks -- inserted here --
  //open apps -- inserted here --
  var app = qlik.openApp('GOOGLE PLAY ANALYTICS.qvf',config);
  console.log(app)
  // EXPORTING QLIK TO GLOBAL SCOPE
  window.qlik = qlik;
  // EXPOERTING APP TO GLOBAL SCOPE
  window.app = app;

  function AppUi(app) {
    //Require app.js
    require({ context: "appRequire" }, ["app/app.js"]);
  }

  //get objects -- inserted here --

  if ( app ) {
    new AppUi( app )
  }

});
