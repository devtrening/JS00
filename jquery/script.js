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
});