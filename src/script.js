const countdownEl = document.getElementById('countdown');
const buttonEl = document.getElementById('btn');

let time = 25 * 60 - 1;
buttonEl.onclick = function(){
    setInterval(function(){
        countdown(time);
        time--;
    }, 1000);
}

function countdown(time){
    //times in sec
    if (time <= 0){
        countdownEl.textContent = '00:00';
        return;
    }
    
    let min = Math.floor(time / 60);
    let sec = time % 60;

    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;

    countdownEl.textContent = `${min}:${sec}`;
}