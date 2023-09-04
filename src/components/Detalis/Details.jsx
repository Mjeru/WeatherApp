import styles from './Details.module.css'
import windImg from '../../assets/images/wind.svg';
import {Loader} from "../Loader/Loader";
import {LoadingContext, WeatherContext} from "../../App";
import {useContext} from "react";
import {Progressbar} from "../Progressbar/Progressbar";
import {getWindDirection} from "../../utils/getWindDirection";
export function Details(){
	const {isLoading} = useContext(LoadingContext)
	const {weather} = useContext(WeatherContext)
	if (!weather) return (<></>)
	return (
		<div className={styles.details}>
			<div className={`${styles.details__wrapper} ${isLoading && styles.loading}`}>
				<div className={`${styles.details__item} ${styles.details__itemBig}`}>
					{isLoading && <Loader currentClass={styles.details__loader} />}
					<h3 className={styles.details__title}>
						Скорость ветра
					</h3>
					<div className={styles.details__value}>
						<span>{weather.wind.speed}</span>
						<span> м/с</span>
					</div>
					<div className={styles.details__icon}>
						<img style={{transform: `rotate(${weather.wind.deg + 45}deg)`}} src={windImg} alt="" className="wind-arrow nw"/>
						<span> {getWindDirection(weather.wind.deg)}</span>
					</div>
				</div>
				<div className={`${styles.details__item} ${styles.details__itemBig}`}>
					{isLoading && <Loader currentClass={styles.details__loader} />}
					<h3 className={styles.details__title}>
						Влажность
					</h3>
					<div className={styles.details__value}>
						<span>{weather.main.humidity}</span>
						<span> %</span>
					</div>
					<Progressbar progress={weather.main.humidity}/>
				</div>
				<div className={styles.details__item}>
					{isLoading && <Loader currentClass={styles.details__loader} />}
					<h3 className={styles.details__title}>
						Видимость
					</h3>
					<div className={styles.details__value}>
						<span>{weather.visibility/1000}</span>
						<span> км</span>
					</div>
				</div>
				<div className={styles.details__item}>
					{isLoading && <Loader currentClass={styles.details__loader} />}
					<h3 className={styles.details__title}>
						Давление
					</h3>
					<div className={styles.details__value}>
						<span>{Math.round(weather.main.pressure * 0.75)}</span>
						<span className={styles.long}> мм рт. ст.</span>
					</div>
				</div>
			</div>
		</div>
	)
}
