var parameters = {
  target: '#myFunction', //where graph will be printed
  //set of attributes for first graph
  // [] = array in javascript
  data: [{
    fn: 'sin(x)', //what function is being graphed
    color: 'red',
  //set of attributes for first graph
 }],
  grid: true, 
  yAxis: {domain: [-1, 1]}, //y-Axis range
  xAxis: {domain: [0, 2*Math.PI]} //x-Axis range
};

function plot() {
  var f = document.querySelector("#function").value;
  var xMin = document.querySelector("#xMin").value;
  var xMax = document.querySelector("#xMax").value;
  var yMin = document.querySelector("#yMin").value;
  var yMax = document.querySelector("#yMax").value;
  var color = document.querySelector("#color").value;
  parameters.data[0].fn = f;
  parameters.xAxis.domain = [xMin, xMax];
  parameters.yAxis.domain = [yMin, yMax];
  parameters.data[0].color = color;

  functionPlot(parameters);
}


