const startBtn = document.querySelector('#startBtn');
const state = document.querySelector('#state');
const settings = document.querySelector('#settings');
const modalSettings = document.querySelector('#modal__settings');
const minutes = document.querySelector('#min');
const seconds = document.querySelector('#sec');
const inputWork = document.querySelector('#inputWork');
const inputChat = document.querySelector('#inputChat');
const dong = new Audio('./assets/dong.mp3');

let defaultWorkLeft = 19;
let defaultChatLeft = 4;
let secondLeft = 59;
let isWork = true;
let isStart = false;
let minutesLeft;
let timerId;

const updateWorkTime = (e) => {
	let workTime;
	workTime = e.srcElement.value;
	defaultWorkLeft = workTime - 1;
};

const updateChatTime = (e) => {
	let chatTime;
	chatTime = e.srcElement.value;
	defaultChatLeft = chatTime - 1;
};

const countDown = () => {
	timerId = setInterval(() => {
		if (!isStart) {
			clearInterval(timerId);
		} else {
			if (secondLeft === 0) {
				if (minutesLeft === 0) {
					if (isWork) {
						isWork = false;
						dong.play();
						state.innerHTML = 'Chat and enjoy!';
						minutesLeft = defaultChatLeft;
						secondLeft = 59;
					} else {
						isWork = true;
						dong.play();
						state.innerHTML = 'Work time!';
						minutesLeft = defaultWorkLeft;
						secondLeft = 59;
					}
				} else {
					minutesLeft -= 1;
					secondLeft = 59;
				}
			} else {
				minutes.innerHTML =
					minutesLeft < 10 ? '0' + minutesLeft.toString() : minutesLeft;
				seconds.innerHTML =
					secondLeft < 10 ? '0' + secondLeft.toString() : secondLeft;
				secondLeft -= 1;
			}
		}
	}, 1000);
};

const start = () => {
	if (!isStart) {
		state.innerHTML = 'Work time!';
		startBtn.innerHTML = 'Stop';
		isStart = true;
		minutesLeft = defaultWorkLeft;
		secondLeft = 59;
		countDown();
	} else {
		isStart = false;
		state.innerHTML = 'Press start';
		startBtn.innerHTML = 'Start';
		minutes.innerHTML = 'min';
		seconds.innerHTML = 'sec';
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
inputWork.addEventListener('input', updateWorkTime);
inputChat.addEventListener('input', updateChatTime);
