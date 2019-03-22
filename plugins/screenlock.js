function lockReady() {

	const { type } = screen.orientation;
	console.log("Fullscreen and locked to ${type}. Ready!");

}

async function lockStart() {

	await screen.orientation.lock("landscape-primary");
	lockReady();

}

document.getElementById("lsButton").click();
