let countDown;
const timerNode =  document.getElementById('timer-run');
const endTimerNode =  document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.querySelector('#time-form');

(function(){
    timer(0)
})();

// function that reduce the time for every seconds

function timer(seconds){
    clearInterval(countDown);
    minutes = '';
    const now  = Date.now();
    const then = now+seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countDown = setInterval(()=>{
        const secondsLeft  = Math.round((then - Date.now())/1000);
        if(secondsLeft<0){
            clearInterval(countDown);
            return
        }
        displayTimeLeft(secondsLeft);
    },1000)
}

// calculate minutes ans seconds
function displayTimeLeft(seconds){
    const minute = Math.floor(seconds/60);
    const secondsRemain = seconds%60;
    let secondsVal = secondsRemain<10?'0':'';
    let newTimeNode = document.createElement('div');
    const innerNode=`${minute}:${secondsVal}${secondsRemain}`
    timerNode.textContent = innerNode
}
// calculate the timer end time
function displayEndTime(endseconds){
    const endtime = new Date(endseconds);
    const hour = endtime.getHours();
    const minutes = endtime.getMinutes();
    const stdTime = (hour>12)?hour-12:hour;
    const timeEnd  =  `${stdTime}:${minutes<10?'0':''}${minutes}`;
    endTimerNode.textContent=`Be Back At ${timeEnd} `

}
function startTimer(){
    const timerValue  =parseInt(this.dataset.time);
    timer(timerValue)
}
function setTimer(e){
const minutes = this.minutes.value;
    timer(parseInt(minutes)*60)
    this.reset()
e.preventDefault();
}
buttons.forEach(button=>button.addEventListener('click',startTimer))
form.addEventListener('submit',setTimer)

