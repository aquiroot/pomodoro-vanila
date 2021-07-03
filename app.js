const startBtn = document.querySelector('#startBtn');
const state = document.querySelector('#state');
const settings = document.querySelector('#settings');
const modalSettings = document.querySelector('#modal__settings');
const minutes = document.querySelector('#min');
const seconds = document.querySelector('#sec');

let minutesLeft = 19;
let secondLeft = 59;
let isWork = true;
let isStart = false;
let timerId;

const countDown = () => {
	timerId = setInterval(() => {
		if (!isStart) {
			clearInterval(timerId);
		} else {
			if (secondLeft === 0) {
				if (minutesLeft === 0) {
					if (isWork) {
						isWork = false;
						state.innerHTML = 'Chat and enjoy!';
						minutesLeft = 4;
						secondLeft = 59;
					} else {
						isWork = true;
						state.innerHTML = 'Work time!';
						minutesLeft = 19;
						secondLeft = 59;
					}
				}
				minutesLeft -= 1;
				secondLeft = 59;
			}
			minutes.innerHTML =
				minutesLeft < 10 ? '0' + minutesLeft.toString() : minutesLeft;
			seconds.innerHTML =
				secondLeft < 10 ? '0' + secondLeft.toString() : secondLeft;
			secondLeft -= 1;
		}
	}, 1000);
};

const start = () => {
	if (!isStart) {
		state.innerHTML = 'Work time!';
		startBtn.innerHTML = 'Stop';
		isStart = true;
		countDown();
	} else {
		isStart = false;
		state.innerHTML = 'Press start';
		startBtn.innerHTML = 'Start';
		minutes.innerHTML = 'min';
		seconds.innerHTML = 'sec';
		minutesLeft = 19;
		secondLeft = 59;
	}
};

const showModal = () => {
	if (modalSettings.style.visibility === 'visible') {
		modalSettings.style.visibility = 'hidden';
	} else {
		modalSettings.style.visibility = 'visible';
	}
};

startBtn.addEventListener('click', start);
settings.addEventListener('click', showModal);
