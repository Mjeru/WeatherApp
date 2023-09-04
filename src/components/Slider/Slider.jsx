import styles from './Slider.module.css';

import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {LoadingContext, WeatherContext} from "../../App";
import {Loader} from "../Loader/Loader";
import {parseWeekCast, parseHourCast} from "../../utils/generateWeekCast";



export function Slider({cast}) {
	const [list, setList] = useState([])
	const {weather, forecast} = useContext(WeatherContext)
	const {isLoading} = useContext(LoadingContext)
	const [scrollStatus, setScrollStatus] = useState(null)
	const ribon = useRef(null)

	const scrollCheck = useCallback(() => {
		const container = ribon.current.parentNode
		if (container.scrollWidth === container.offsetWidth) {
			setScrollStatus(null)
			return
		}
		if (container.scrollLeft === 0) {
			setScrollStatus('left')
			return
		}
		if (container.scrollLeft + container.offsetWidth === container.scrollWidth) {
			setScrollStatus('right')
			return
		}
		setScrollStatus('center')
	}, [setScrollStatus, ribon]);
	const scrollDebounce = useCallback(() => {
		let timerContainer
		return () => {
			clearTimeout(timerContainer)
			timerContainer = setTimeout(scrollCheck, 100)
		}
	}, [scrollCheck])
	const sliderResize = useCallback(() => {
		if (ribon.current) {
			const container = ribon.current.parentNode
			if (container.scrollWidth === container.offsetWidth) {
				setScrollStatus(null)
			} else {
				if (container.scrollLeft + container.offsetWidth === container.scrollWidth) {
					setScrollStatus('right')
					return;
				}
				if (container.scrollLeft === 0) {
					setScrollStatus('left')
					return;
				}
				setScrollStatus('center')
			}
		}
	}, [])

	const clickRight = () => {
		if (ribon.current && ribon.current.childNodes.length > 0) {
			const containerRight = ribon.current.parentNode.getBoundingClientRect().right
			for (let i = 0; i < ribon.current.childNodes.length; i++) {
				const slide = ribon.current.childNodes[i]
				if (slide.getBoundingClientRect().right - 5 > containerRight) {
					slide.scrollIntoView({behavior: "smooth", block: "nearest"})
					setScrollStatus('center')
					if (i === ribon.current.childNodes.length - 1) setScrollStatus('right')
					break
				}
			}
		}
	}
	const clickLeft = (ev) => {
		ev.preventDefault()
		if (ribon.current && ribon.current.childNodes.length > 0) {
			const containerLeft = ribon.current.parentNode.getBoundingClientRect().left
			for (let i = ribon.current.childNodes.length - 1; i >= 0; i--) {
				const slide = ribon.current.childNodes[i]
				if (slide.getBoundingClientRect().left < containerLeft) {
					slide.scrollIntoView({behavior: "smooth", block: "nearest",})
					setScrollStatus('center')
					if (i === 0) setScrollStatus('left')
					break
				}
			}
		}
	}

	useEffect(() => {
		if (ribon.current && !ribon.current.parentNode.getAttribute('data-listener')) {
			ribon.current.parentNode.setAttribute('data-listener', true)
			ribon.current.parentNode.addEventListener('scroll', scrollDebounce())
			window.addEventListener('resize', sliderResize)
		}
	}, [ribon, scrollDebounce,sliderResize]);

	useEffect(() => {
		if (forecast && typeof forecast === "object") {
			cast === 'week' ?
				setList(
					() => parseWeekCast(forecast))
				: setList(
					() => parseHourCast(forecast))

		}
	}, [sliderResize, weather, cast, forecast])

	useEffect(() => {
		sliderResize()
	}, [list, sliderResize]);

	return (
		<div className={`${styles.slider} `}>
			<div className={styles.slider__container} id="slider__container">

				<div className={`${styles.slider__ribbonContainer}`}>
					<div ref={ribon} className={styles.slider__ribbon} id="slider__ribbon">
						{isLoading && list.map(el => (

							<div key={el.id} className={styles.slider__itemContainer}>
								<div className={styles.slider__item}>
									<Loader currentClass={styles.sliderLoader}/>
								</div>
							</div>))}
						{!isLoading && list.map(el => (
							<div key={el.id} className={styles.slider__itemContainer}>
								<div className={styles.slider__item}>
									<div className={`${styles.weatherCart} ${isLoading && styles.loading}`}>
										{cast === 'week' ?
											<>
												<div className={styles.weatherCart__heading}>{el.date}</div>
												<img className={styles.weatherCart__image} src={`https://openweathermap.org/img/wn/${el.icon}@2x.png`}
												     alt={`${el.iconText}`}/>
												<div className={`${styles.weatherCart__footer}`}>
													<span>{el.dayTemp}°C</span>
													<span>{el.nightTemp}°C</span>
												</div>
											</> : <>
												<div className={styles.weatherCart__heading}>{el.date}</div>
												<img className={styles.weatherCart__image} src={`https://openweathermap.org/img/wn/${el.icon}@2x.png`}
												     alt={`${el.iconText}`}/>
												<div className={`${styles.weatherCart__footer} ${styles.short}`}>
													<span>{el.temp}°C</span>
												</div>
											</>
										}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				className={`${styles.slider__nav} ${styles.slider__nav_prev} ${scrollStatus === 'left' || !scrollStatus ? styles.disabled : ''}`}
				onClick={clickLeft}>
				<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
					<circle cx="19" cy="19" r="19" transform="rotate(-180 19 19)" fill="white"/>
					<path d="M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5" stroke="#ACACAC"
					      strokeWidth="3"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
					<circle  cx="19" cy="19" r="19"  fill="#212331"/>
					<path  d="M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5"
					      stroke="#ACACAC" strokeWidth="3"/>
				</svg>
			</div>
			<div
				className={`${styles.slider__nav} ${styles.slider__nav_next} ${scrollStatus === 'right' || !scrollStatus ? styles.disabled : ''}`}
				onClick={clickRight}>
				<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
					<circle cx="19" cy="19" r="19" fill="white"/>
					<path d="M15 13.5L24.1265 19.1497C24.758 19.5407 24.758 20.4593 24.1265 20.8503L15 26.5" stroke="#ACACAC"
					      strokeWidth="3"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
					<circle cx="19" cy="19" r="19" fill="#212331"/>
					<path transform="rotate(-180 19 19)" d="M23 24.5L13.8735 18.8503C13.242 18.4593 13.242 17.5407 13.8735 17.1497L23 11.5"
					      stroke="#ACACAC" strokeWidth="3"/>
				</svg>
			</div>
		</div>
	)
}

