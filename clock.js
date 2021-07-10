// set the canvas variable
var canvas = document.getElementById("canvas");

// set the canvas into 2d
var ctx = canvas.getContext("2d");

// set the radius of the clock
var radius = canvas.height / 2;

// set the position of the clock in the center of the canvas
ctx.translate(radius, radius);

radius = radius * 0.9;

// call the drawClock() function
setInterval(drawClock, 1000);

// define the drawClock() function
function drawClock() {
    // call the drawFace() function
    drawFace(ctx, radius);

    // call the drawNumbers() function
    drawNumbers(ctx, radius);

    // call the drawTime() function
    drawTime(ctx, radius);
}

// define the drawFace() function
function drawFace(ctx, radius){
    
    // draw the background of the clock face
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // draw the border of the clock
    var grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    // draw the central circle of the clockface
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();

}


//define the drawNumbers() function
function drawNumbers(ctx, radius){
    var ang;
    var num;

    // define the font size and family of the numbers
    ctx.font = radius * 0.15 + "px arial";

    // define the font postion of the respective placement
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // for loop for drawing the numbers
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

// define the drawTime() function
function drawTime(ctx, radius){
    // set the date function
    var now = new Date();

    // set the hour
    var hour = now.getHours();

    // set the minute
    var minute = now.getMinutes();

    // set the seconds
    var second = now.getSeconds();

    // draw the hour hand
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + 
    (second * Math.PI / (360 * 60));

    // call the drawHand() function for hour hand
    drawHand(ctx, hour, radius * 0.5 , radius * 0.07);

    // draw the minute hand
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));

    // call the drawHand() function for minute hand
    drawHand(ctx, minute, radius*0.8, radius*0.07);
  
    // draw the seconds hand
    second=(second*Math.PI/30);

    //call the drawHand() functin for seconds hand
    drawHand(ctx, second, radius*0.9, radius*0.02);

}

// define the drawHand() function
function drawHand(ctx, pos, length, width){
    // draw the hand
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos)
}