import styles from './Forecast.module.css';
import {SectionTitle} from "../SectionTitle/SectionTitle";
import {useState} from "react";
import {Slider} from "../Slider/Slider";

export function Forecast() {
	const [cast, setCast] = useState('week')

	const clickHandler = () => {
		setCast(()=>cast === 'week' ? 'hour' : 'week')
	}


	return (
		<>
		<SectionTitle title={'Прогноз'}>
			<nav className={`${styles.switcher}`}>
				<button id="week-cast__button" data-value='week' onClick={clickHandler} className={`${styles.switcher__item} ${cast === 'week' ? styles.active : ''}`}>на неделю</button>
				<button id="hour-cast__button" data-value='hour' onClick={clickHandler} className={`${styles.switcher__item} ${cast === 'hour' ? styles.active : ''}`}>почасовой</button>
			</nav>
		</SectionTitle>
		<Slider cast={cast}/>
		</>
	)
}
