/*
    The purpose of this file is to read the data from the mp3 file and add effects to the audio
*/

// WebAudio context
let audioCtx;

// WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode, trebleBiquadFilter, bassBiquadFilter, distortionFilter;

// here we are faking an enumeration
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 512
});

// Set up audio
const setupWebaudio = filePath => {
    // The || is because WebAudio has not been standardized across browsers yet
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Create <audio> element
    element = new Audio();

    // Load track
    loadSoundFile(filePath);

    // Create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // Create high shelf biquad filter (treble)
    trebleBiquadFilter = audioCtx.createBiquadFilter();
    trebleBiquadFilter.type = `highshelf`;

    // Create low shelf biquad filter (bass)
    bassBiquadFilter = audioCtx.createBiquadFilter();
    bassBiquadFilter.type = `lowshelf`;

    // Create a distortion filter
    distortionFilter = audioCtx.createWaveShaper();

    // Create an analyser node
    analyserNode = audioCtx.createAnalyser();

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // Create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // Connect the nodes to create an audio graph
    // ORDER MATTERS
    sourceNode.connect(trebleBiquadFilter);
    trebleBiquadFilter.connect(bassBiquadFilter);
    bassBiquadFilter.connect(distortionFilter);
    distortionFilter.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
}

// Manage audio effects
const manageEffects = params => {
    // Treble
    if (params.treble) {
        trebleBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        trebleBiquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    }
    else {
        trebleBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    // Bass
    if (params.bass) {
        bassBiquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        bassBiquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
    }
    else {
        bassBiquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    // Distortion
    if (params.distortion) {
        distortionFilter.curve = null;
        let n_samples = 256;
        let curve = new Float32Array(n_samples);
        for (let i = 0; i < n_samples; i++) {
            let x = i * 2 / n_samples - 1;
            curve[i] = x * params.distortionAmount; // classic distortion
        }
        distortionFilter.curve = curve;
    }
    else {
        distortionFilter.curve = null;
    }
}

// Loads track file (mp3)
const loadSoundFile = filePath => {
    element.src = filePath;
}

// Plays track
const playCurrentSound = () => {
    element.play();
}

// Pauses track
const pauseCurrentSound = () => {
    element.pause();
}

// Sets volume
const setVolume = value => {
    value = Number(value);
    gainNode.gain.value = value;
}

export { audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, manageEffects, loadSoundFile, setVolume, analyserNode };
