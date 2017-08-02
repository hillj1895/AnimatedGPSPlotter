var viewer = new Cesium.Viewer('cesiumDiv')
var timeline = viewer.timeline;
var clock = viewer.clock;

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
}

    //var metaLatitude = document.getElementById("metaLatitude");
    //var metaLongitude = document.getElementById("metaLongitude");

    //metaLatitude.innerHTML += " " + citizensBankPark.position.getValue().y;
    //metaLongitude.innerHTML += " " + citizensBankPark.position.getValue().x;

function dataCallback() {
	// To be called each tick to check whether new point should be displayed
	console.log('hello');
}

// Sample point to fly to
var citizensBankPark = viewer.entities.add({
	position : Cesium.Cartesian3.fromDegrees(-73.6440, 43.3095),
	point : {
	    pixelSize : 5,
		color : Cesium.Color.RED,
		outlineColor : Cesium.Color.WHITE,
		outlineWidth : 2
  }
});

viewer.flyTo(viewer.entities);


// });


