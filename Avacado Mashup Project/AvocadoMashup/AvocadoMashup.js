var prefix = window.location.pathname.substr(0,window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);

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

require(["js/qlik"], function(qlik) {
  qlik.setOnError(function(error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });
  $("#closePopup").click(function() {
    $("#popup").hide();
  });
	
  //open apps -- inserted here --
	var app = qlik.openApp('AVOCADO PRICES.qvf', config);

  //get objects -- inserted here --
	app.getObject('CurrentSelections','CurrentSelections');
	
	


});
