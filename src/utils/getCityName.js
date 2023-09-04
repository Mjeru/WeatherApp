export function getCityName(city) {
	return city.display_name ? city.display_name.split(',')[0] : 'Ошибка вывода названия';
}
