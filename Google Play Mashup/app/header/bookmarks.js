define([], function() {
  console.log("bookmarks loaded");

  //Upon Click of Bookmark New
  $("#newBm").click(function() {
    $("#formModal").toggle(true);
    $("#createBm").prop("disabled", false);
    $("#newBm").prop("disabled", true);
  });

  //Create Bookmark
  $("#createBm").click(function() {
    var title = $("#bmTitle").val();
    var desc = $("#bmDesc").val();
    //apply bookmark
    app.bookmark.create(title, desc).then(function(){
      //save app
      app.doSave();
    });

    $("#bmTitle").val("");
    $("#bmDesc").val("");
  });

  //Return List of Bookmarks
  app.getList("BookmarkList", function(reply) {
    var str = "";
    reply.qBookmarkList.qItems.forEach(function(value) {
      str +=
        '<li class="list-group-item"><a class="list-container" data-id="' +
        value.qInfo.qId +
        '">' +
        '<span class="bm-title-text">' +
        value.qData.title +
        "</span>" +
        '<span class="bm-title-desc">' +
        value.qData.description +
        "</span></a>" +
        '<i class="fas fa-trash"' +
        'data-id="' +
        value.qInfo.qId +
        '"></i></li>';
    });
    $(".list-group").html(str);
    $(".list-container").click(function() {
      var id = $(this).data("id");
      app.bookmark.apply(id);
      $("#bookmarkModal").modal("hide");
    });
    $(".fa-trash").click(function() {
      var id = $(this).data("id");
      app.bookmark.remove(id).then(function(){
        //save app
        app.doSave();
      });
      $("#bookmarkModal").modal("hide");
    });
  });
});
