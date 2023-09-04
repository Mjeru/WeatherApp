const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

export function getWindDirection(direction){
	if (direction >= 337.5) return directions[0]
	if (direction < 22.5) return directions[0]
	if (direction < 67.5) return directions[1]
	if (direction < 112.5) return directions[2]
	if (direction < 157.5) return directions[3]
	if (direction < 202.5) return directions[4]
	if (direction < 247.5) return directions[5]
	if (direction < 292.5) return directions[6]
	if (direction < 337.5) return directions[7]
	return 'Ошибка определения направления'
}
