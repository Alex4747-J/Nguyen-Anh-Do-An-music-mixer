const soundClips = document.querySelectorAll(".sound-clip");
const dropZones = document.querySelectorAll(".drop-zone");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const volumeSlider = document.querySelector("#volume-slider");


let currentlyPlaying = null;

function dragStart(event) {
    
    if (event.target.classList.contains('sound-clip')) {
        const trackRef = event.target.dataset.trackref;
        event.dataTransfer.setData('text/plain', trackRef);
    }
}

function dragOver(event) {
    event.preventDefault();
    const dropZone = event.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function dragLeave(event) {
    const dropZone = event.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }
}

function drop(event) {
    event.preventDefault();
    const dropZone = event.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
        const trackRef = event.dataTransfer.getData('text/plain');

        if (trackRef) {
            loadAudio(trackRef, dropZone);
        }
    }
}

function loadAudio(trackRef, targetDropZone) {
    
    const audioPlayer = document.querySelector(`audio[data-trackref="${trackRef}"]`);

    if (audioPlayer) {
        
        currentlyPlaying = audioPlayer;
        audioPlayer.volume = volumeSlider.value;
        audioPlayer.currentTime = 0; 
        audioPlayer.play();

        
        const originalClipImage = document.querySelector(`div[data-trackref="${trackRef}"] img`);
        targetDropZone.innerHTML = ''; 
        const newImage = document.createElement('img');
        newImage.src = originalClipImage.src;
        targetDropZone.appendChild(newImage);
    }
}

function playMix() {
    if (currentlyPlaying) {
        currentlyPlaying.play();
    }
}

function pauseMix() {
    if (currentlyPlaying) {
        currentlyPlaying.pause();
    }
}

function resetMixer() {
    if (currentlyPlaying) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        currentlyPlaying = null;
    }
    

    dropZones.forEach(zone => {
        zone.innerHTML = '';
    });
}

function volumeChange() {
    if (currentlyPlaying) {
        currentlyPlaying.volume = volumeSlider.value;
    }
}


soundClips.forEach(clip => clip.addEventListener('dragstart', dragStart));
playBtn.addEventListener('click', playMix);
pauseBtn.addEventListener('click', pauseMix);
resetBtn.addEventListener('click', resetMixer);
volumeSlider.addEventListener('input', volumeChange);

dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', drop);
});