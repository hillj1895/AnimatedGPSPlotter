var viewer = new Cesium.Viewer('cesiumDiv')

var data;

function handleFile(evt) {
  var file = evt.target.files[0];
  //console.log(evt.target.files);
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      data = results;
      console.log(results);
    }
  });
}

$(document).ready(function() {
  $("#csv-file").change(handleFile);
});

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
	clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
});
