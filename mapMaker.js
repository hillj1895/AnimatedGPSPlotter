var viewer = new Cesium.Viewer('cesiumDiv')

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
      setInterval();
      var myDate = new Date(data[0].sense_time);

      console.log(myDate.getTime());
    }
  });
}

function dataCallback() {
	// To be called each tick to check whether new point should be displayed
	console.log('hello');
}

// var times = Cesium.TimeIntervalCollection.fromIso8601({
//     iso8601: '2015-07-30/2017-06-16/P1D',
//     leadingInterval: true,
//     trailingInterval: true,
//     isStopIncluded: false, // We want stop time to be part of the trailing interval
//     dataCallback: dataCallback
// });

$(document).ready(function() {
  $("#csv-file").change(handleFile);
});

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



var clock = new Cesium.Clock({
	startTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
	currentTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
	stopTime : Cesium.JulianDate.fromIso8601("2013-12-26"),
	clockRange : Cesium.ClockRange.LOOP_STOP,
	clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
	shouldAnimate : true,
	canAnimate: true

});


