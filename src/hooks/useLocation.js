import {useCallback, useEffect,} from 'react';
import {generateRandomString} from "../utils/generateRandomString";
import {store} from "../utils/store";

export const useLocation = (setLocation, history,setHistory) => {
	const getLocationByIp = useCallback(async () =>{
		try{
			const fetchIp = await fetch(`http://ip-api.com/json/`)
			const resultFetchIp = await fetchIp.json()
			const city = resultFetchIp.city
			const getCity = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${city}&format=json&addressdetails=1&limit=1&accept-language=ru`);
			const result = await getCity.json()
			const newLocation = {...result[0], id: generateRandomString()}
			setLocation(newLocation)
			setHistory([newLocation])
			store.setItem('location', result[0])
		} catch (err) {
			console.error(err)
		}
	},[setHistory,setLocation])
	useEffect(() => {
		if (!store.getItem('location')){
		    void getLocationByIp()
		}
	}, [getLocationByIp]);
};
