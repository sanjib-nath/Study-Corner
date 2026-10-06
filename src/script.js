const countdownEl = document.getElementById('countdown');
const buttonEl = document.getElementById('btn');
const labelEl = document.getElementById('session-label');

let focus_ses = 0;
let intervalid = null;
let time = null;


buttonEl.onclick = function(){

    //start / resume
    if (buttonEl.textContent != 'Pause'){
        if (time == null) start_session();
        else run_timer();
        buttonEl.textContent = 'Pause';
    }

    //pause
    else {
        clearInterval(intervalid);
        intervalid = null;
        buttonEl.textContent = 'Resume';
    }
}

function run_timer(){
    intervalid = setInterval(function(){
            if (time <= 0) {
                clearInterval(intervalid);
                intervalid = null;
                time = null;
                focus_ses++;
                start_session();
                return;
            }
            countdown(time);
            time--;
        }, 1000);
}

function start_session(){
    let [starting_min, session] = cur_session(focus_ses)
    time = starting_min * 60 - 1;

    labelEl.textContent = session;

    run_timer();
}

function cur_session(focus_ses){
    if (focus_ses == 0){
        return [25, 'Focus'];
    }
    if (focus_ses % 5 == 0){
        return [15, 'Long Break'];
    }

    else {
        if (focus_ses % 2 == 1){
            return [5, 'Short Break'];
        }
        else {
            return [25, 'Focus'];
        }
    }
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