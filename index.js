let play = document.getElementById("play");
let audio = document.getElementById("audio");
let img = document.getElementById("img");
let trackName = document.getElementById("trackName");
let next = document.getElementById("next");
let previous = document.getElementById("prev");
let volumeUp = document.getElementById("volume-up");
let volumeDown = document.getElementById("volume-down");
let duration = document.getElementById("duration");
let currentTime = document.getElementById("current-time");
let progress = document.getElementById("progress");

let audios = [
  "Myheart.mp3",
  "prema velluva.mp3"
];

let images = [
  "https://tse1.mm.bing.net/th?id=OIP.hclL56AXPuYaNOwfuUpOYgHaEK&pid=Api&P=0&h=220",
  "https://tse1.mm.bing.net/th?id=OIP.iVcKXG64rm621oILHvZt9AHaHa&pid=Api&P=0&h=220" 
];

let trackNames = [
  "My Heart",
  "Prema Velluva"
];

let currentIndex = 0;
audio.src = audios[currentIndex];
img.src = images[currentIndex];
trackName.textContent = trackNames[currentIndex];

audio.addEventListener("loadedmetadata", function() {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function() {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.currentTime;
  if (audio.duration) {
    progress.max = audio.duration;
  }
});

progress.addEventListener("input", function(event) {
  audio.currentTime = progress.value;
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  sec = (sec < 10 ? '0' + sec : sec);
  return `${min}:${sec}`;
}

next.addEventListener("click", function() {
  currentIndex++;
  if (currentIndex >= audios.length) {
    currentIndex = 0;
  }
  audio.src = audios[currentIndex];
  img.src = images[currentIndex];
  trackName.textContent = trackNames[currentIndex];
  audio.play();
});

prev.addEventListener("click", function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = audios.length - 1;
  }
  audio.src = audios[currentIndex];
  img.src = images[currentIndex];
  trackName.textContent = trackNames[currentIndex];
  audio.play();
});

volumeUp.addEventListener("click", function() {
  if (audio.volume < 1) {
    audio.volume += 0.1;
  }
  if (audio.volume > 1) {
    audio.volume = 1;
  }
});

volumeDown.addEventListener("click", function() {
  if (audio.volume > 0) {
    audio.volume -= 0.1;
  }
  if (audio.volume < 0) {
    audio.volume = 0;
  }
});

play.addEventListener("click", function(event) {
  if (audio.paused) {
    play.textContent = "pause";
    audio.play();
    img.classList.add("rotate");
  } else {
    audio.pause();
    play.textContent = "play";
    img.classList.remove("rotate");
  }
});

audio.addEventListener("ended", function() {
  next.click();
});
