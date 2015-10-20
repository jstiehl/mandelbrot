//var _ = require('underscore');
var context = document.getElementById("canvas").getContext("2d");

var canvas = document.getElementById("canvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var inSet = [];
var notInSet = [];
//scale -2 to +2 real
//-2 to +2 imaginary

var testPoints = generateGrid(2, 2, 2000);

_.each(testPoints, function(point){
  mandlebrotTest(point, 1000);
});

/// Initialization
draw(100, 50,5);


//point is an array of length 2 representing the point of interest in the complex plane
function complexNumberSquared(point) {
  return [(point[0]*point[0]-point[1]*point[1]), 2*point[0]*point[1]]; // returns a point in the complex plane
}

// point 1 and point 2 are arrays of length 2
function complexNumberAddition(point1, point2) {
  return[(point1[0]+point2[0]), (point1[1]+point2[1])]
}

// need to generate my grid of points
function generateGrid(reScale, imScale, points) {
  var deltaRe = 2*reScale/(points);
  var deltaIm = 2*imScale/(points);
  var grid = [];
  for (var x = -reScale; x < reScale + deltaRe; x += deltaRe){
    for (var y = -imScale; y < imScale + deltaIm; y += deltaIm) {
      grid.push([x,y]);
    }
  }
  return _.sample(grid, grid.length-1);
}

function mandlebrotTest(point, maxIterations) {
  var z = [[0,0]];
  var c = point;
  for (var i = 1; i < maxIterations; i++){
    z[i] = complexNumberAddition(complexNumberSquared(z[i-1]), c);
    if(Math.abs(z[i][0]) > 2 || Math.abs(z[i][1]) > 2) {
      point.push(i);
      notInSet.push(point);
      return;
    }
  }
  //if we get through for loop without return that means point is in set
  inSet.push(point);
  return;
}

function draw (x,y,j) {
  context.clearRect(0,0,context.canvas.width,context.canvas.height);

  //drawGrid(context,'white',10,10);
  context.save();

  _.each(notInSet, function(point){
    SetPixel(context, (point[0]*200+300), (point[1]*200+250), point[2]);
  });
  context.restore();

}

function drawGrid (context, color, stepx, stepy) {
  context.strokeStyle = color;
  context.lineWidth = 0.5;

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i,0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0,i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }
}

function SetPixel(canvas, x, y, j)
{
  if(j <= 4){
    canvas.strokeStyle = "black";
  } else if(j > 4 && j <= 10) {
    canvas.strokeStyle = "black";
  } else if(j>10 && j < 40 ){
    canvas.strokeStyle = "red";
  } else if(j > 40 && j < 100){
    canvas.strokeStyle = "blue";
  } else {
    canvas.strokeStyle = "green";
  }
  canvas.beginPath();
  canvas.moveTo(x, y);
  canvas.lineTo(x+0.4, y+0.4);
  canvas.stroke();
}