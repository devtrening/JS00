$(document).ready(function(){
    $('button').click(function() {
        if ($(this).text() === 'Show') {
            $(this).text('Hide');
        } else {
            $(this).text('Show');
        }
        $('h1').toggle();
    });
    
    $('<button>', {
        'id' : 'slide',
        'class' : 'btn btn-info',
        'text' : 'Sakrij',
        click : function() {
            $('h1').slideToggle(10000, function(){alert('jos 10 sekundi')});
        }
    }).insertAfter('button');
    
    $(window).scroll(function(){
        $('.navbar').animate({top : $(document).scrollTop()}, {duration:500});
    });
    
    $('a[href=#]').click(function(e) {
        $('html').animate({scrollTop : 0}, 'slow');
        e.preventDefault();
    });
    
//    $(document).mousemove(function(e) {
//        $('.navbar').animate({top:e.pageY, left:e.pageX}, {queue : false});
//    });

    $(window).resize(function (e){
        var width = $(window).width();
        if (width < 512) {
            $('h1').css({fontSize : '10px'});
        } else {
            $('h1').css({fontSize : '50px'});
        }
//        
//        $('h1')
    });
    
//    $('#noviSadrzaj')
//        .hide()
//        .load(
//            'data.html',
//            null, 
//            function (){
//                $('#noviSadrzaj').slideDown();
//            });

//    $.ajax(
//        'file.php', 
//        { 
//            data : 'ime=Ivan', 
//            type: 'GET', 
//            dataType : 'json', 
//            success: function(data) { 
//                $('#noviSadrzaj').text('Njegovo ime je ' + data.ime); 
//            }  
//        }
//    );
});