import styles from './Searchbar.module.css';
import {Button} from "../Button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {SearchHistory} from "../SearchHistory/SearchHistory";
import {LocationContext} from "../../App";
import {generateRandomString} from "../../utils/generateRandomString";
import {useLocation} from "../../hooks/useLocation";
import {store} from "../../utils/store";

export function Searchbar({isOpen, setIsOpen}) {
	const [value, setValue] = useState('')
	const {setLocation} = useContext(LocationContext)
	const [history, setHistory] = useState(()=> store.getItem('history') ? store.getItem('history') : [])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const input = useRef(null)

	useEffect(()=>{
		if (isOpen && input.current){
			setValue('')
			input.current.focus()
		}
	},[isOpen])

	useEffect(() => {
		if (!isLoading && isOpen && input.current) input.current.focus()
	}, [isLoading,isOpen]);
	const onChange = (ev) => {
		setValue(ev.target.value)
		setIsError(false)
	}
	const submitHandler = async (ev) => {
		ev.preventDefault();
		setIsLoading(true)
		setIsError(false)
		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${value}&format=json&addressdetails=1&limit=1&accept-language=ru`);
			const result = await response.json()
			if (result.length > 0) {
				const historyItem = {...result[0], id: generateRandomString(), loaded: false}
				setHistory(()=> [{...historyItem}, ...history.filter((el, index) =>  el.place_id !== result[0].place_id)].filter((el,index) => index < 5))
				setLocation(historyItem)
				store.setItem('location', result[0])
			} else {
				setIsError(true)
			}
			setIsLoading(false)
		} catch (err) {
			console.error(err)
			setIsLoading(false)
		}
	}
	useLocation(setLocation,history,setHistory)
	return (
		<section id="searchbar" className={`${styles.searchbar} ${isOpen && styles.open}`}>
			<button id="closeButton" className={styles.close} onClick={() => {
				setIsOpen(false)
			}}/>
			<div className={styles.searchbar__searchBlock}>
				<form className={styles.form} id={'findCity'} onSubmit={submitHandler}>

				</form>
				<label>
					{isError ? <div className={styles.error_massage}>{'Упс! Город не найден, попробуйте другой'}</div> : ''}
					<input ref={input} form={'findCity'} className={`${styles.searchbar__input} ${isLoading || !isOpen ? styles.disabled : ''}`} disabled={isLoading || !isOpen} type="text" value={value} onChange={onChange} placeholder={'Искать город'}/>
				</label>
				<Button form={'findCity'} type={'submit'} text={'Найти'}/>
			</div>
			<SearchHistory list={history} setIsOpen={setIsOpen} setHistory={setHistory}/>
		</section>
	)
}
