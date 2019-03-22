var watchID = null;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


	startWatch();


}

function startWatch() {

	var options = { frequency: 10 };
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);


}

function stopWatch() {

	if (watchID) {

			navigator.accelerometer.clearWatch(watchID);
			watchID = null;

	}

}

function onSuccess(acceleration) {

	accelX = Math.round(acceleration.x * 100) / 100;
	accelY = Math.round(acceleration.y * 100) / 100;
	accelZ = Math.round(acceleration.z * 100) / 100;

	var element = document.getElementById('accelerometer');
	element.innerHTML = 'Acceleration X: ' + accelX + '<br>' +'<br>' +
			    'Acceleration Y: ' + accelY + '<br>' +'<br>' +
			    'Acceleration Z: ' + accelZ + '<br>';

}

function onError() {

	alert('accelError!');

}