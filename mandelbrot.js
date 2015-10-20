<!DOCTYPE html>
<html>
<head>
  <title>Circle</title>
  <style>
  body {
    background-color: #000;
                color: #FFF;
    text-align: center;
  }
  canvas {
    border: 1px solid black;
    background-color: #000;
    box-shadow: 3px 3px 3px 3px black;
  }
  #container {
    margin-top: 20px;
    text-align: center;
  }
  </style>
</head>
<body>
<h1>Mandelbrot Set</h1>
<div id="container"><canvas id="canvas" height="500" width="500"> Your browser does not support Canvas </canvas></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="mandelbrot.js" type="text/javascript"></script>
</body>
</html>