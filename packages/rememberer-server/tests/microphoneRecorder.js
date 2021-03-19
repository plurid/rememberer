const fs = require('fs');

const MicrophoneRecorder = require('../distribution').MicrophoneRecorder;



const microphoneRecorder = new MicrophoneRecorder();

const file = fs.createWriteStream('test.wav', { encoding: 'binary' })

microphoneRecorder.start().pipe(file);

setTimeout(function () {
    microphoneRecorder.stop();
}, 3000);
