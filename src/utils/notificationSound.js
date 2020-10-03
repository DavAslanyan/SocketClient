import notificationMusic from "../assets/sound/notification-sound.mp3";

export const _Sound = () => {
    const audio = new Audio(notificationMusic);
    audio.muted = false;
    let playing = false;
    const play = () => {
        playing = true;
        audio.play();
    };
    audio.addEventListener('ended', () => {
     //   console.log('audio ended');
        playing = false;
    });
    return function () {
        return {
            playing,
            play
        }
    }
};

export const notificationSound = _Sound();
