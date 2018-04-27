const player = document.querySelector(".player");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const progressBar = document.querySelector(".progress");
const proFill = progressBar.querySelector(".progress_filled");
const vol = document.querySelector("input[type='range'");
const volBtn = document.querySelector(".volume_icon");
const fullScreen = document.querySelector(".fullScreen");
const skipBtn = document.querySelectorAll("button[data-skip]");
let fullTime = document.querySelector(".time");
let prevVol = 0;

function togglePlay() {
    const toggle = video.paused ? "play" : "pause";
    video[toggle]();
}

function updateIcon() {
    if (this === playBtn) {
        if (this.textContent === "play_arrow") {
            this.textContent = "pause";
        } else {
            this.textContent = "play_arrow";
        }
    } else {
        if (playBtn.textContent === "play_arrow") {
            playBtn.textContent = "pause";
        } else
            playBtn.textContent = "play_arrow";
    }
}

function currMoveTime() {

	let currMin = Math.floor(video.currentTime / 60);
	let currSec = Math.floor(video.currentTime - currMin * 60, 0);
	if(currSec < 10){
		currSec = "0" + currSec;
	}
	let fullMin = Math.floor(video.duration/60);
	let fullSec = Math.floor(video.duration - fullMin * 60 , 0);

	fullTime.textContent = `${currMin}:${currSec} / ${fullMin}:${fullSec}`;

    let now = (video.currentTime / video.duration) * 100;
    proFill.style.width = now + "%";
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function volume() {
    if (vol.value == 0) {
        currentValue = vol.value;
        video.volume = 0;
        volBtn.textContent = "volume_off";
    } else {
        let vols = this.value / 100;
        video.volume = vols;
        volBtn.textContent = "volume_mute";
    }
}

function soundOff() {

    if (this.textContent === "volume_mute") {

        this.textContent = "volume_off";
        prevVol = vol.value;
        vol.value = 0;
        volume();

    } else {

        this.textContent = "volume_mute";
        vol.value = prevVol;
        video.volume = `${prevVol / 100}`;
        volume();

    };
}

function resizeWin() {
    let full = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!full) {
        fullScreen.textContent = "fullscreen_exit";
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullScreen) {
            player.webkitRequestFullScreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
    } else {
        fullScreen.textContent = "fullscreen";
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
};

function moveTo(e){
	let goTo = e.offsetX/player.clientWidth * video.duration ; 
	video.currentTime = goTo;
}

vol.addEventListener("mousemove", volume);
vol.addEventListener("change", volume);
volBtn.addEventListener("click", soundOff);

skipBtn.forEach(button => button.addEventListener("click", skip));
playBtn.addEventListener("click", togglePlay);
playBtn.addEventListener("click", updateIcon);
progressBar.addEventListener("click", moveTo);

video.addEventListener("click", togglePlay);
video.addEventListener("click", updateIcon);
video.addEventListener("timeupdate", currMoveTime);
fullScreen.addEventListener("click", resizeWin);