'use strict';

const elemHi = document.createElement('div');
const dayNow = document.createElement('div');
const timeNowDocument = document.createElement('div');
const timeRemainingDocument = document.createElement('div');

function getTime() {
	const dateNow = new Date();
	const dateNewYear = new Date('01 01 2021');
	const daysWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	
	const day = daysWeek[dateNow.getDay()];
	const timeRemaining = Math.floor((dateNewYear - dateNow) /1000 / 60 / 60 / 24);
	const timeNow = dateNow.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

	return { day, timeRemaining, timeNow, dateNow};
}

function elemDocument() {
	const time = getTime();
	if (time.dateNow.getHours() >= 0){
		elemHi.textContent = `Доброй ночи`;
	} 
	if (time.dateNow.getHours() > 3) {
		elemHi.textContent = `Доброе утро`;
	} 
	if (time.dateNow.getHours() > 11) {
		elemHi.textContent = `Добрый день`;
	} 
	if (time.dateNow.getHours() > 16) {
		elemHi.textContent = `Добрый вечер`;
	}
	dayNow.textContent = `Сегодня: ${time.day}`;
	timeNowDocument.textContent = `Текущее время: ${time.timeNow}`;
	timeRemainingDocument.textContent = `До нового года осталось ${time.timeRemaining} дней`;
}
elemDocument();

const interval = setInterval(elemDocument, 1000);


document.body.append(elemHi);
document.body.append(dayNow);
document.body.append(timeNowDocument);
document.body.append(timeRemainingDocument);
