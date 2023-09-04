import styles from './Sidebar.module.css'
import {Button} from "../Button/Button";
import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher";
import {Searchbar} from "../Searchbar/Searchbar";
import {useContext, useEffect, useRef, useState} from "react";
import {LocationContext, WeatherContext} from "../../App";
import {getCityName} from "../../utils/getCityName";
import {getDateText} from "../../utils/generateWeekCast";

export function Sidebar(){
	const [isOpen, setIsOpen] = useState(false);
	const {weather} = useContext(WeatherContext)
	const clickRef = useRef();
	const {location} = useContext(LocationContext);
	const handleClick = e => {
		if (clickRef.current && !clickRef.current.contains(e.target)) {
			setIsOpen(false)
		}
	};

	useEffect(()=>{
		if (isOpen) {
			document.addEventListener('click', handleClick);
			return () => {
				document.removeEventListener('click', handleClick);
			};
		}
	},[isOpen]);
	return ( <>
		<section className={styles.sidebar} ref={clickRef}>
			<div className={styles.sidebar__flexContainer}>
				<div className={styles.sidebar__container}>
					<header className={styles.sidebar__header}>
						<Button text={'Поиск города'} onClick={()=>{setIsOpen(true)}}/>
						<ThemeSwitcher/>
					</header>
					<section className={styles.sidebar__main}>
						<div style={{backgroundImage: `url("https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png")`}} className={styles.sidebar__icon}>
						</div>
						<h2 className={styles.weatherTitle}>{Math.round(weather.main.temp)}<span>°C</span></h2>
						<h3 className={styles.subtitle}>{weather.weather[0].description}</h3>
					</section>
					<footer className={styles.sidebar__footer}>
						<p className={styles.description}>Ощущается как {Math.round(weather.main.feels_like)} °C</p>
						<div className={styles.date}>
							<span>Сегодня</span><span>{getDateText(weather.dt)}</span>
						</div>
						<div className={styles.location}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
								<path
									d="M19.9999 3.33334C13.5499 3.33334 8.33325 8.55001 8.33325 15C8.33325 23.75 19.9999 36.6667 19.9999 36.6667C19.9999 36.6667 31.6666 23.75 31.6666 15C31.6666 8.55001 26.4499 3.33334 19.9999 3.33334ZM19.9999 19.1667C18.8949 19.1667 17.835 18.7277 17.0536 17.9463C16.2722 17.1649 15.8333 16.1051 15.8333 15C15.8333 13.8949 16.2722 12.8351 17.0536 12.0537C17.835 11.2723 18.8949 10.8333 19.9999 10.8333C21.105 10.8333 22.1648 11.2723 22.9462 12.0537C23.7276 12.8351 24.1666 13.8949 24.1666 15C24.1666 16.1051 23.7276 17.1649 22.9462 17.9463C22.1648 18.7277 21.105 19.1667 19.9999 19.1667Z"
									fill="#EC6E4D"/>
							</svg>
							<span>{getCityName(location)}</span>
						</div>
					</footer>
					<Searchbar isOpen={isOpen} setIsOpen={setIsOpen}/>
				</div>
			</div>
		</section>
		</>
	)
}
