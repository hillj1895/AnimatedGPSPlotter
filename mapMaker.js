var viewer = new Cesium.Viewer('cesiumDiv')
var timeline = viewer.timeline;
var clock = viewer.clock;
var previousPoint, currentPoint, nextPoint;

var data;

function handleFile(evt) {
  var file = evt.target.files[0];
  //console.log(evt.target.files);
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      data = results.data;
      console.log(results);
      setTimelineInterval();
      var myDate = new Date(data[0].sense_time);

      console.log(myDate.getTime());
    }
  });
}

// Jquery to run the parser 
$(document).ready(function() {
  $("#csv-file").change(handleFile);
});

// Sets the timeline interval and the current time on the clock to the first time in the CSV file
function setTimelineInterval()
{
  var firstTime = new Date(data[0].sense_time);
  var firstTimeCesium = Cesium.JulianDate.fromDate(firstTime);
  //console.log(firstTime);
  var lastTime = new Date(data[data.length - 1].sense_time);
  var lastTimeCesium = Cesium.JulianDate.fromDate(lastTime);
  timeline.zoomTo(firstTimeCesium, lastTimeCesium);
  clock.startTime = firstTimeCesium;
  clock.stopTime = lastTimeCesium;
  clock.currentTime = firstTimeCesium;
  clock.clockRange = Cesium.ClockRange.LOOP_STOP;
  timeline.updateFromClock();
  previousPoint = data[0];
  currentPoint = data[1];
  nextPoint = data[2];
  assignIndices();
  console.log(nextPoint.myIndex);
  viewer.clock.onTick.addEventListener(function() {
    var currentTime = clock.currentTime;
    // if current time > time in current data point -> then time increasing
    if(currentTime > Cesium.JulianDate.fromDate(new Date(currentPoint.sense_time))) {
      // if current time > next point -> fly to next point and change prev, current, and next configuration
      if(currentTime > Cesium.JulianDate.fromDate(new Date(nextPoint.sense_time))) {
        previousPoint = currentPoint;
        nextpointIndex = currentPoint.myIndex + 1;
        currentPoint = nextPoint;
        nextPoint = data[nextpointIndex];
        flyToPoint();
      }
    }
    // else -> time is decreasing
    else if(currentTime < Cesium.JulianDate.fromDate(new Date(currentPoint.sense_time || previousPoint!=null))) {
      // if current time < prev point -> fly to prev point and change prev, current, and next configuration
      if(currentTime < Cesium.JulianDate.fromDate(new Date(previousPoint.sense_time))) {
        previousPointIndex = previousPoint.myIndex - 1;
        nextPoint = currentPoint;
        currentPoint = previousPoint;
        previousPoint = data[previousPointIndex];
        flyToPoint();
      }

    }
      
    
    console.log(currentTime);
  });
}

function assignIndices()
{
  for (var i = 0; i < data.length; i++) {
    data[i].myIndex = i;
  };
}

    //var metaLatitude = document.getElementById("metaLatitude");
    //var metaLongitude = document.getElementById("metaLongitude");

    //metaLatitude.innerHTML += " " + citizensBankPark.position.getValue().y;
    //metaLongitude.innerHTML += " " + citizensBankPark.position.getValue().x;
function flyToPoint() {
  viewer.entities.removeAll();
  viewer.entities.add({
    position : Cesium.Cartesian3.fromDegrees(currentPoint.longitude, currentPoint.latitude),
    point : {
      pixelSize : 5,
      color : Cesium.Color.RED,
      outlineColor : Cesium.Color.WHITE,
      outlineWidth : 2
    }
  });

  viewer.flyTo(viewer.entities);
}

// Sample point to fly to
// var citizensBankPark = viewer.entities.add({
// 	position : Cesium.Cartesian3.fromDegrees(-73.6440, 43.3095),
// 	point : {
//     pixelSize : 5,
// 		color : Cesium.Color.RED,
// 		outlineColor : Cesium.Color.WHITE,
// 		outlineWidth : 2
//   }
// });

//viewer.flyTo(viewer.entities);


