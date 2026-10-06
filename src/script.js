const countdownEl = document.getElementById('countdown');
const buttonEl = document.getElementById('btn');
const labelEl = document.getElementById('session-label');

buttonEl.onclick = function(){
    promodoro_timer();
}

function promodoro_timer(){
    //loop the timer until it stopped
    let focus_ses = 0;

    function start_session(){
        let [starting_min, session] = cur_session(focus_ses)

        let time = starting_min * 60 - 1;

        labelEl.textContent = session;

        const intervalid = setInterval(function(){
            if (time <= 0) {
                clearInterval(intervalid);
                focus_ses++;
                start_session();
                return;
            }
            countdown(time);
            time--;
        }, 1000);
    }
    start_session();
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