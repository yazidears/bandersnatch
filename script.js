let video = document.getElementById('myVideo');

let checkpoints = {
  18: { keys: ['l'], rewindTo: 18 },
  21: { keys: ['l', 'r'], rewindTo: 21 },
  23: { keys: ['x'], rewindTo: 23, repeating: true }, 
  33: { keys: [], rewindTo: null }
};

let currentCheckpoint = 18; 
let keysPressed = {};
let xKeyRepeats = 0; 

document.addEventListener('keydown', function(event) {
  keysPressed[event.key.toLowerCase()] = true;
  if (event.key.toLowerCase() === 'x' && currentCheckpoint === 23) {
    xKeyRepeats++;
  }
});

document.addEventListener('keyup', function(event) {
  keysPressed[event.key.toLowerCase()] = false;
  if (event.key.toLowerCase() === 'x') {
    xKeyRepeats = 0; 
  }
});

video.addEventListener('timeupdate', function() {
  let checkpoint = checkpoints[currentCheckpoint];
  if (video.currentTime >= currentCheckpoint) {
    if (checkpoint) {
      let allKeysPressed = checkpoint.keys.every(key => keysPressed[key]);
      let repeatingMet = !checkpoint.repeating || (xKeyRepeats > 0); 

      if (!allKeysPressed || !repeatingMet) {
        video.currentTime = checkpoint.rewindTo;
      } else {
        currentCheckpoint = Object.keys(checkpoints).find(key => key > currentCheckpoint); 
      }
    } 
  }
});

video.addEventListener('ended', function() {
    alert("Congratulations! You completed the interactive video!");
    video.currentTime = 33; // Reset the video to the beginning
    video.play(); // Start playing again
  });
  