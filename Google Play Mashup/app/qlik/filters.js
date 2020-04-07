define([], function() {
    console.log('filters loaded')

    new getListData('Category', function(reply){ createFilter(reply,"#categoryFilter") })
    new getListData('Type', function(reply){ createFilter(reply,"#typeFilter") })
    
    //Category Filter Callback
    function createFilter(reply,id) {
        $(id).empty()
        let data = reply.qListObject.qDataPages[0].qMatrix;

        $.each(data, function(val, text) {
            var item = text[0]
            selFormat='';
            
            switch(item.qState) {
                case "S":
                    selFormat = " style=\"background-color:#007BFF;color:white;\"";
                break;
                case "X":
                    selFormat = " style=\"background-color:#a8a8a8;\"";
                break;
                default:
                    selFormat = " style=\"background-color:white;\"";
            }

            $(id).append(
                $("<option" + selFormat + '>'+"</option>")
                    .val(text[0].qText)
                    .html(text[0].qText)
            )
        }).then($("select").selectpicker("refresh"))
    }

    //Category Selections
    $("#categoryFilter").on("change", function(){
        app.field("Category").selectValues($(this).val(),true,true)
    })

    //Type Selections
    $("#typeFilter").on("change", function(){
        app.field("Type").selectValues($(this).val(),true,true)
    })

    //Load Lists
    function getListData(filter, callback){
        app.createList(
            {
                qDef: {
                    qFieldDefs: [ filter ]
                },
                qExpressions: [],
                qInitialDataFetch: [
                    {
                        qHeight: 50,
                        qWidth: 1
                    }
                ],
                qLibraryId: null
            },
            callback
        );
    }


})