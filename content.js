const player = document.getElementById('movie_player');
const video = document.querySelector('video');

setInterval(() => {
    if (player && player.getCurrentTime) {
        console.log('YouTube API time:', player.getCurrentTime());
    }
    
    if (video) {
        console.log('Video element time:', video.currentTime);
    }
}, 100);