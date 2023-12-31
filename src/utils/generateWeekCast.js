import {generateRandomString} from "./generateRandomString";

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

export function parseWeekCast(list) {
	const cast = [];
	const today = new Date(list[0].dt * 1000);
	for (let i = 1; i < 7; i++) {
		const targetDate = new Date(today)
		targetDate.setDate(today.getDate() + i)
		const day = list.find((el) => {
			const elDate = new Date(el.dt * 1000)
			return elDate.getDate() === targetDate.getDate() && (elDate.getHours() > 13 && elDate.getHours() < 17)
		})
		const night = list.find((el) => {
			const elDate = new Date(el.dt * 1000)
			return elDate.getDate() === targetDate.getDate() && (elDate.getHours() > 1 && elDate.getHours() < 5)
		})
		if (night && day) {
			cast.push({
				date: i === 1 ? 'Завтра' :`${weekDays[targetDate.getDay()]}, ${targetDate.getDate()} ${months[targetDate.getMonth()]}`,
				dayTemp: Math.round(day.main.temp),
				nightTemp: Math.round(night.main.temp),
				id: generateRandomString(),
				icon: day.weather[0].icon,
				iconText: day.weather[0].main
			})
		}  else {
			cast.push({
				...cast[i-2],
				date: i === 1 ? 'Завтра' :`${weekDays[targetDate.getDay()]}, ${targetDate.getDate()} ${months[targetDate.getMonth()]}`,
				dayTemp: Math.round(cast[i-2].dayTemp + Math.random() * 6 - 3),
				nightTemp: Math.round(cast[i-2].nightTemp + Math.random() * 6 - 3),
				id: generateRandomString(),
			})
		}
	}
	return cast
}
export function parseHourCast(list){
	const cast = []
	for (let i = 0; i < list.length; i++) {
			cast.push({
				date: `${(new Date(list[i].dt * 1000).getHours())}:00`,
				temp: Math.round(list[i].main.temp),
				id: generateRandomString(),
				icon: list[i].weather[0].icon,
				iconText: list[i].weather[0].main
			})
	}
	return cast
}

export function getDateText(dt){
	  return `${weekDays[new Date(dt * 1000).getDay()]}, ${new Date(dt * 1000).getDate()} ${months[new Date(dt * 1000).getMonth()]}`
}

