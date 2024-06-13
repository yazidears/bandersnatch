let video = document.getElementById('myVideo');

let checkpoints = {
  18: { keys: ['l'], rewindTo: 18 },
  19: { keys: ['l'], rewindTo: 18 },
  20: { keys: ['l'], rewindTo: 18 },

  21: { keys: ['l', 'r'], rewindTo: 20.2 },
  22: { keys: ['l', 'r'], rewindTo: 20.2 },

  23: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  24: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  25: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  26: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  27: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  28: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  29: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  30: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  31: { keys: ['l', 'r', 'x'], rewindTo: 23 },
  32: { keys: ['l', 'r', 'x'], rewindTo: 23 },
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
