// #region imports
    // #region libraries
    import {
        spawn,
        ChildProcess
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        MicrophoneRecorderDefaults,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
class MicrophoneRecorder {
    private recording: null | ChildProcess;

    constructor() {
        this.recording = null;
    }


    public start(
        options?: any,
    ) {
        options = {
            ...MicrophoneRecorderDefaults,
            ...options,
        };

        const audioType = "wav";

        const cmd = 'sox';
        const cmdArgs = [
            '-q',                                   // show no progress
            // '-t', 'waveaudio',
            '-d',
            '-r', options.sampleRate.toString(),    // sample rate
            '-c', '1',                              // channels
            '-e', 'signed-integer',                 // sample encoding
            '-b', '16',                             // precision (bits)
            '-t', audioType,  // audio type
            '-'
        ];

        this.recording = spawn(cmd, cmdArgs);
        const record = this.recording.stdout;

        if (options.verbose) {
            console.log(
                'Recording',
                options.channels,
                'channels with sample rate',
                options.sampleRate + '...',
            );

            console.time('End Recording');

            record?.on('data', function (data) {
                console.log('Recording %d bytes', data.length)
            });

            record?.on('end', function () {
                console.timeEnd('End Recording');
            });
        }

        return record;
    }

    public stop() {
        if (!this.recording) {
            return false;
        }

        this.recording.kill();
        return this.recording;
    }
}
// #endregion module



// #region exports
export default MicrophoneRecorder;
// #endregion exports
