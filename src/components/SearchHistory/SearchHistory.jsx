import styles from './SearchHistory.module.css'
import {LoadingContext, LocationContext, WeatherContext} from "../../App";
import {useCallback, useContext, useEffect, useState} from "react";
import {getCityName} from "../../utils/getCityName";
import {Icon} from "../Icon/Icon";
import {Loader} from "../Loader/Loader";
import {apiConfig} from "../../conf/api.conf";
import {store} from "../../utils/store";


export function SearchHistory({list, setIsOpen}) {
	const [onLoading, setOnLoading] = useState(null)
	const {location,setLocation} = useContext(LocationContext);
	const {setIsLoading} = useContext(LoadingContext);
	const {setWeather} = useContext(WeatherContext);
	const {setForecast} = useContext(WeatherContext);
	const [isMounted, setIsMounted] = useState(false)
	const clickHandler = (city) => () => {
		if (location.id !== city.id) {
			setLocation(city)
		}
	}
	const getWeatherFetch = useCallback(async (city)=>{
		setOnLoading(city.id)
		setIsLoading(true)

		try {
			const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiConfig.key}&units=metric&lang=ru`);
			const weather = await weatherResponse.json()
			const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiConfig.key}`)
			const forecast = await forecastResponse.json()
			setForecast(forecast.list)
			setOnLoading(null)
			setWeather(weather)
			setLocation(city)
			store.setItem('location', city)
			store.setItem('weather', weather)
			store.setItem('forecast', forecast.list)
			setIsOpen(false)
			setIsLoading(false)


		} catch (err) {
			console.error(err)
			setOnLoading(null)
			setIsLoading(false)
		}
	}, [setLocation, setIsOpen,setIsLoading, setWeather,setForecast])
	useEffect(()=>{
		if (list.length && isMounted){
			void getWeatherFetch(location)
			store.setItem('history', list)
		} else {
			setIsMounted(true)
		}
	},[location, list, getWeatherFetch, isMounted, setIsMounted])
	return (
		<ul className={styles.list}>
			{list.map(city => (
				<li key={city.id}
				    className={`${styles.item} ${styles.visible} ${
						onLoading === city.id ? 
							styles.itemHidden : 
							''
					} ${
						location.id === city.id ? 
							styles.active : 
							''
				    }`} onClick={clickHandler(city)}>
					<span>{getCityName(city)}</span>
					{onLoading === city.id ?
							<Loader currentClass={styles.loader}/> : ''
					}
					<Icon name={'arrow'}/>
				</li>
			))}
		</ul>
	)
}
