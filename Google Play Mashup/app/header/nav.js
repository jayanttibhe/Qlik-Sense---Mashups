define(["jquery", "jqueryui", "bootstrap", "bootstrapSelect"], function($) {
  //Initialise Bootstrap Tooltip
  $(function(){
    $('[data-toggle="tooltip"]').tooltip()
  })
  
  //Initialise Bootstrap Select
  $("select").selectpicker({tickIcon:''});

  //Hide New Bookmark Form on load
  $("#formModal").toggle(false);

  //Upon Bookmark Modal Closing
  $("#bookmarkModal").on("hidden.bs.modal", function() {
    $("#formModal").toggle(false);
    $("#createBm").prop("disabled", true);
    $("#newBm").prop("disabled", false);
  });

  //Selections Navigation
  $("[data-control]").click(function() {
    var $element = $(this);
    switch ($element.data("control")) {
      case "clear":
        app.clearAll();
        break;
      case "back":
        app.back();
        break;
      case "forward":
        app.forward();
        break;
    }
  });

  //Initialise autocomplete
  $("#barSearch").each(function() { $(this).autocomplete({ src: [] }); });

  // Search Functionality
  $("#barSearch").keyup(function() {
    app.searchResults(
      [$("#barSearch").val()],
      { qOffset: 0, qCount: 15 },
      { qContext: "CurrentSelections" },
      function(reply) {
        var arrSearch = [];
        var searchTerm = reply.qResult.qSearchGroupArray;
        $.each(searchTerm, function(key, value) {
          var dim = value.qItems[0].qIdentifier;
          var matches = value.qItems[0].qItemMatches;
          $.each(matches, function(key, value) {
            arrSearch.push({
              Dimension: dim,
              Value: value.qText
            });
          });
        });
        //Call Autocomplete Function
        autoCompleteSearch(arrSearch);
      }
    );
  });

  function autoCompleteSearch(value) {
    $('#barSearch').autocomplete({
        source: function(_request, response) {
            response(
                $.map(value, function(value){
                    return {
                        label: value.Value,
                        value: value.Dimension
                    }
                })
            )
        },
        select: function(_event, ui) {
            app.field(ui.item.value).selectValues([ui.item.label], true, true)
            return false
        }
    }).autocomplete( "instance" )._renderItem = function( ul, item) {
        return $( '<li>' )
            .append( '<div class="search-label">' + item.label + '</div><div class = "search-value">' + item.value + '</div>')
            .appendTo(ul)
    }
  }



});
