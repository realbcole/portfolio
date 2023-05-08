/*
  main.js is primarily responsible for hooking up the UI to the rest of the application
  and setting up the main event loop
*/

import * as utils from "./utils.js";
import * as audio from "./audio.js";
import * as visualizer from "./visualizer.js";

// Parameters for what is being displaying in the visualizer
const drawParams = {
  frequency: true,
  waveform: false,
  showGradient: true,
  showBars: true,
  showFish: true,
  showNoise: true,
  showInvert: false,
}

// Parameters for audio effects
const audioParams = {
  treble: false,
  bass: false,
  distortion: false,
  distortionAmount: 20
}

// Default track that is loaded on start
const DEFAULTSOUND = `media/Time to Pretend.mp3`;

// Called once the json file is loaded
const dataLoaded = e => {
  console.log(`In onload - HTTP Status Code = ${e.target.status}`);

  // Parse json
  const responseText = e.target.responseText;
  const json = JSON.parse(responseText);

  // Set up default track
  audio.setupWebaudio(DEFAULTSOUND);

  // Set up canvas and image files in visualizer
  let imageFiles = json.imageFiles;
  let canvasElement = document.querySelector(`canvas`);
  visualizer.setupCanvas(canvasElement, audio.analyserNode, imageFiles);

  // Set up UI
  setupUI(canvasElement, json);

  // Start main event loop
  loop();
}

// Loads json file
const loadData = () => {
  const url = `./data/av-data.json`;
  const xhr = new XMLHttpRequest();
  xhr.onload = dataLoaded;
  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open(`GET`, url);
  xhr.send();
}

// Init
const init = () => {
  loadData();
}

// Sets up UI
const setupUI = (canvasElement, json) => {

  // Gets audio files from json
  const audioFiles = json.audioFiles;

  // Sets page title from json
  document.querySelector(`title`).innerHTML = json.title;

  // Fullscreen button
  let fs = false;
  document.querySelector(`#btn-fs`).onclick = e => {
    utils.goFullscreen(canvasElement);
  };

  // Play/pause button
  let playButton = document.querySelector(`#btn-play`);
  playButton.onclick = e => {
    // check if context is in suspended state (autoplay policy)
    if (audio.audioCtx.state == `suspended`) {
      audio.audioCtx.resume();
    }
    if (e.target.dataset.playing == `no`) {
      // if track is currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = `yes`; // Set the text to "Pause"

    } else {
      // if track is playing, pause it
      audio.pauseCurrentSound();
      e.target.dataset.playing = `no`; // Set the text to "Play"
    }
  };

  // Volume slider & label
  let volumeSlider = document.querySelector(`#slider-volume`);
  // add .oninput event to slider
  volumeSlider.oninput = e => {
    // set the gain
    audio.setVolume(e.target.value);
    // update value of label to match value of slider
    document.querySelector(`#label-volume`).innerHTML = Math.round(e.target.value / 2 * 100);
  };
  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event(`input`));

  // Track selection
  let trackSelect = document.querySelector(`#select-track`);
  // Automatically loads all files in json
  trackSelect.innerHTML = `${audioFiles.map(e => `<option value="media/${e}.mp3" selected>${e}</option>`)}`;
  trackSelect.onchange = e => {
    // Change track on change
    audio.loadSoundFile(e.target.value);
    // pause the track if it is playing
    if (playButton.dataset.playing == `yes`) {
      playButton.dispatchEvent(new MouseEvent(`click`));
    }
  };

  // Upload file button
  document.querySelector(`#upload`).onchange = e => {
    const files = e.target.files;
    // Load new track
    audio.loadSoundFile(URL.createObjectURL(files[0]));
    // pause track if it is playing
    if (playButton.dataset.playing == `yes`) {
      playButton.dispatchEvent(new MouseEvent(`click`));
    }
  };

  // Audio data select
  let audioSelect = document.querySelector(`#select-data`);
  audioSelect.onchange = e => {
    if (e.target.value == `waveform`) {
      drawParams.frequency = false;
      drawParams.waveform = true;
    }
    else {
      drawParams.frequency = true;
      drawParams.waveform = false;
    }
  };

  // Treble option
  document.querySelector(`#cb-highshelf`).onchange = e => {
    audioParams.treble = e.target.checked;
  };

  // Bass option
  document.querySelector(`#cb-lowshelf`).onchange = e => {
    audioParams.bass = e.target.checked;
  };

  // Distortion option
  document.querySelector(`#cb-distortion`).onchange = e => {
    audioParams.distortion = e.target.checked;
  };
  // Distortion Slider
  let distortionSlider = document.querySelector(`#slider-distortion`)
  distortionSlider.value = audioParams.distortionAmount;
  document.querySelector(`#label-distortion`).innerHTML = 20; // default value
  distortionSlider.oninput = e => {
    audioParams.distortionAmount = e.target.value;
    document.querySelector(`#label-distortion`).innerHTML = Math.round(e.target.value);
  };

  // Gradient option
  document.querySelector(`#cb-gradient`).onchange = e => {
    if (e.target.checked) {
      drawParams.showGradient = true;
    } else {
      drawParams.showGradient = false;
    }
  };

  // Bars option
  document.querySelector(`#cb-bars`).onchange = e => {
    if (e.target.checked) {
      drawParams.showBars = true;
    } else {
      drawParams.showBars = false;
    }
  };

  // Fish option
  document.querySelector(`#cb-fish`).onchange = e => {
    if (e.target.checked) {
      drawParams.showFish = true;
    } else {
      drawParams.showFish = false;
    }
  };

  // Noise option
  document.querySelector(`#cb-noise`).onchange = e => {
    if (e.target.checked) {
      drawParams.showNoise = true;
    } else {
      drawParams.showNoise = false;
    }
  };

  // Invert Colors option
  document.querySelector(`#cb-invert`).onchange = e => {
    let all = document.querySelectorAll(`*`);
    let buttons = document.querySelectorAll(`input`);
    if (e.target.checked) {
      drawParams.showInvert = true;
      // Update CSS to teal to match inverted colors
      document.querySelector(`#controls`).style.border = `3px solid teal`;
      for (let i = 0; i < all.length; i++) {
        all[i].style.color = `teal`;
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.accentColor = `teal`;
      }
    } else {
      // Change CSS back to pink
      drawParams.showInvert = false;
      document.querySelector(`#controls`).style.border = `3px solid pink`;
      for (let i = 0; i < all.length; i++) {
        all[i].style.color = `pink`;
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.accentColor = `pink`;
      }
    }
  };
}

// Main event loop
const loop = () => {
  setTimeout(loop, 1000 / 60);
  visualizer.draw(drawParams);
  audio.manageEffects(audioParams);
}

export { init };