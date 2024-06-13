let video = document.getElementById('myVideo');

let checkpoints = {
  18: { keys: ['l'], rewindTo: 18 },
  21: { keys: ['l', 'r'], rewindTo: 21 },
  23: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  33: { keys: [], rewindTo: null }
};

let currentCheckpoint = 18; 
let keysPressed = {};

document.addEventListener('keydown', function(event) {
  keysPressed[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', function(event) {
  keysPressed[event.key.toLowerCase()] = false;

  // Check if a key required for the current checkpoint is released
  if (checkpoints[currentCheckpoint].keys.includes(event.key.toLowerCase())) {
    video.currentTime = checkpoints[currentCheckpoint].rewindTo; 
  }
});

video.addEventListener('timeupdate', function() {
  let checkpoint = checkpoints[currentCheckpoint];
  if (video.currentTime >= currentCheckpoint) {
    if (checkpoint) {
      let allKeysPressed = checkpoint.keys.every(key => keysPressed[key]);
      if (!allKeysPressed) {
        video.currentTime = checkpoint.rewindTo; 
      } else {
        currentCheckpoint = Object.keys(checkpoints).find(key => key > currentCheckpoint); 
      }
    } 
  }
});

video.addEventListener('ended', function() {
  alert("FINISH")
});
