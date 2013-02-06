var pos = {x : 200, y : 100};

(function () {
    "use strict";

    var main = document.getElementById('main');
    var container = document.getElementById('container');
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    
    canvas.id = 'canvas';
  
    canvas.width = 400;
    canvas.height = 200;
    
    main.appendChild(canvas);

    var getFireImage = function(imageUrl) {
        var frame = new Image();
        frame.onload = function() {};
        frame.src = imageUrl;
        
        return frame;
    };

    var fire = [
        getFireImage('/udacity/assets/vatra1.png'),
        getFireImage('/udacity/assets/vatra2.png'),
        getFireImage('/udacity/assets/vatra3.png'),
        getFireImage('/udacity/assets/vatra4.png'),
        getFireImage('/udacity/assets/vatra5.png'),
        getFireImage('/udacity/assets/vatra6.png')
    ];

    var backgroundImage = new Image();
    backgroundImage.onload = function () {};
    backgroundImage.src = '/udacity/assets/background.png';

    var drawScene = function(frame) {
        var x = 0, y = 0;
        
        for (x = -64 + frame; x < 400; x += 64) {
            for (y = 0; y < 200; y += 64) {
            context.drawImage(backgroundImage, x, y);
            }
        }
    };
    
    var frame = 0;
    var posX = 5;
    var bgPos = 0;

    var animate = function() {
//      context.clearRect(0,0, 400, 200);
        drawScene(bgPos);
        context.drawImage(fire[frame], pos.x, pos.y);
        context.drawImage(fire[frame], 400-posX, 5);
        frame = (frame + 1) % fire.length;
        bgPos = (bgPos + 1) % 64;
        posX = (posX + 1) % 450;
    };

    setInterval(animate, 1000/30);   
   
}());
