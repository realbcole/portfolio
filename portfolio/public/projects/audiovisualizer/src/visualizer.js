/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
*/

import * as utils from "./utils.js";

// Important variables
let ctx, canvasWidth, canvasHeight, gradient, analyserNode, analyserNode2, audioData, audioData2;
// Images
let bgImage, fishImage, waveImage;
let imagesLoaded = false;

// Sets up the canvas element
const setupCanvas = async (canvasElement, analyserNodeRef, imageFiles) => {
    // create drawing context
    ctx = canvasElement.getContext(`2d`);

    // Get canvas width/height
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;

    // create a (beautiful) gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: .1, color: `#2e2b28` }, { percent: .2, color: `#3b3734` },
    { percent: .3, color: `#474440` }, { percent: .4, color: `#54504c` }, { percent: .5, color: `#6b506b` }, { percent: .6, color: `#ab3da9` },
    { percent: .7, color: `#de25da` }, { percent: .8, color: `#eb44e8` }, { percent: .9, color: `#ff80ff` }]);

    // keep a reference to the analyser node (and 2nd one)
    analyserNode = analyserNodeRef;
    analyserNode2 = analyserNodeRef;

    // The arrays where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 3);
    audioData2 = new Uint8Array(analyserNode.fftSize / 40);

    // Preload image files
    try {
        await Promise.all(preloadImages(imageFiles));
        imagesLoaded = true;
    } catch (error) {
        console.error(error);
    }

}

// Preload image files
const preloadImages = imageFiles => {
    const promises = [];
    for (let i of imageFiles) {
        let img = new Image();
        img.src = `media/${i}`;
        let promise = new Promise((resolve, reject) => {
            img.onload = () => {
                if (i == 'bg.jpg') bgImage = img;
                if (i == 'deadfish.png') fishImage = img;
                if (i == 'waves.png') waveImage = img;
                resolve();
            }
            img.onerror = () => {
                reject(new Error(`Failed to load image ${i}`));
            }
        });
        promises.push(promise);
    }
    return promises;
}


// Fish sprite class
class Fish {
    image;
    audioData;
    constructor(audioData) {
        this.image = fishImage;
        this.audioData = audioData;
    }
    draw(i, barSpacing, margin, barWidth, topSpacing, fishSize) {
        ctx.save();
        ctx.drawImage(this.image, margin + i * (barWidth + barSpacing), (-this.audioData * 1.5) + topSpacing, fishSize, fishSize);
        ctx.restore();
    }
}

// Draw function, where all the visualization takes place
const draw = (params = {}) => {

    // Update canvas width and height
    ctx.canvas.width = 1360;
    ctx.canvas.height = 720;

    // populate the audioData arrays with the data from the analyserNode
    if (params.frequency) {
        analyserNode.getByteFrequencyData(audioData);
        analyserNode2.getByteFrequencyData(audioData2);
    }
    if (params.waveform) {
        analyserNode.getByteTimeDomainData(audioData);
        analyserNode2.getByteTimeDomainData(audioData2);
    }

    // draw background
    try {
        ctx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight);
    }
    catch {
        console.log(`images not loaded yet`)
    }

    // draw bars on the sun
    if (params.showBars) {
        let barWidth = 2;
        let barHeight = 10;
        let centerX = canvasWidth / 2;
        let centerY = canvasHeight / 2;
        let barNum = audioData.length;

        ctx.save();
        ctx.fillStyle = `red`;
        ctx.strokeStyle = `orange`;
        ctx.lineWidth = .5;

        // Draw bars around the sun (circle equation)
        let theta = -300;
        let delta = (Math.PI * 1.05 / barNum);

        // Adjust size based on canvas size
        let xMultiplier, yMultiplier, xOffset, yOffset;

        xMultiplier = 93;
        yMultiplier = 95.5;
        xOffset = 1;
        yOffset = 63;

        // loop through the data and draw
        for (let i = 0; i < barNum; i++) {
            ctx.fillRect(centerX + Math.sin(theta) * xMultiplier + xOffset, (centerY + yOffset) + Math.cos(theta) * yMultiplier, barWidth, barHeight * -audioData[i] / 50);
            ctx.strokeRect(centerX + Math.sin(theta) * xMultiplier + xOffset, (centerY + yOffset) + Math.cos(theta) * yMultiplier, barWidth, barHeight * -audioData[i] / 50);
            theta += delta;
        }

        ctx.restore();
    }

    // Draw fish
    if (params.showFish) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData2.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData2.length;
        let topSpacing;
        let fishSize = 100;

        // Adjust fish position for waveform data
        if (params.waveform) {
            topSpacing = 600;
        }
        else {
            topSpacing = canvasHeight / 1.5;
        }

        if (imagesLoaded) {
            for (let i = 0; i < audioData2.length; i++) {
                let fish = new Fish(audioData2[i]);
                fish.draw(i, barSpacing, margin, barWidth, topSpacing, fishSize);
            }

            // Draw waves on top of fish so it looks like they're coming out of the water
            ctx.save();
            ctx.drawImage(waveImage, 0, 0, canvasWidth, canvasHeight);
            ctx.restore();
        }
    }

    // draw gradient
    if (params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }

    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;

    // Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
        // randomly change every 20th pixel to pink (show noise)
        if (params.showNoise && Math.random() < .05) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 0; // zero out the red and green and blue channels
            data[i] = 255;
            data[i + 1] = 105;
            data[i + 2] = 180;
        }
        // invert colors
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red; // set red
            data[i + 1] = 255 - green; // set green
            data[i + 2] = 255 - blue; // set blue
        }
    }

    // copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw };