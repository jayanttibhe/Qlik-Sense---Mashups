define([], function() {
  console.log("selections loaded");

  //Grab Current Selections
  app.getList("SelectionObject", function(reply) {
    $selections = $("#currSelections");
    $selections.html("");

    //Setting Starting variable
    var selectionsObject = reply.qSelectionObject.qSelections;
    
    //Total Selections Badge
    var initialValue = 0;
    var totalSelections = selectionsObject.reduce(function(acc, cur) {
      return acc + cur.qSelectedCount;
    }, initialValue);

    if (totalSelections == 0) {
      $(".notification .badge").hide();
    } else {
      $(".notification .badge").show().html(totalSelections);
    }

    //Loop through selections and append to modal
    $.each(selectionsObject, function(key, value) {
      //Setting Starting variables
      var field = value.qField;
      var numSelected = value.qSelectedCount;
      var total = value.qTotal;
      var threshold = 3;
      var selectedStr = value.qSelected;

      if (numSelected <= threshold) {
        var html = "";
        html += "<span class='selected-field-container' id='" + field + "'>";
        html += "<span class='selected-field'>" + field + ": </span>";
        html += selectedStr;
        html += "<span class='clear-field'>X</span>";
        html += "</span>";
        $selections.append(html);
      } else {
        var html = "";
        html += "<span class='selected-field-container' id='" + field + "'>";
        html += "<span class='selected-field'>" + field + ": </span>";
        html += numSelected + " of " + total;
        html += "<span class='clear-field'>X</span>";
        html += "</span>";
        $selections.append(html);
      }
    });

    //Clear selection
    $(".clear-field").click(function() {
      var field = $(this)
        .parent()
        .attr("id");
      app.field(field).clear();
    });
  });

  // Add clear selections functionality
});
