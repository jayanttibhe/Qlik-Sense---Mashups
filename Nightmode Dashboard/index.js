//On Document Ready
$(function(){
    //Expand / Collapse Sidebar
    $('.drawer-nav').click(function(){
        $('#right-section').toggleClass('collapsed')
        $('.sidebar li').toggleClass('collapsed')
        $('.sidebar li a').toggleClass('collapsed')
        $('.sidebar span').toggle()
    })

    //Nightmode Toggle
    $('.nightmode').click(function(){
        $('#nav').toggleClass('night')
        $('#left-section').toggleClass('night')
        $('#bottom-right').toggleClass('night')
    })

    //Tooltips
    $('[data-toggle="tooltip"]').tooltip()
})