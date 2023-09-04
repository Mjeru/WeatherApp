import './App.css';
import {Container} from "./components/Container/Container";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Main} from "./components/Main/Main";
import {createContext, useEffect, useState} from "react";
import {documentHeightFix} from "./utils/mobileHeight";
import {generateRandomString} from "./utils/generateRandomString";
import {defaultWeather, defaultCast} from "./utils/defaultWeather";
import {store} from "./utils/store";

documentHeightFix();
export const ThemeContext = createContext(null);
export const LocationContext = createContext(null);
export const LoadingContext = createContext(null);
export const WeatherContext = createContext(null);

const defaultLocation = {address: {city: 'Москва'}, display_name: 'Москва', id: generateRandomString()};

function App() {
	const [theme, setTheme] = useState(store.getItem('theme') ? store.getItem('theme') : 'light');
	const [location, setLocation] = useState(()=>{return store.getItem('location') ? store.getItem('location') : defaultLocation})
	const [isLoading, setIsLoading] = useState(true)
	const [weather, setWeather] = useState(()=>{return store.getItem('weather') ? store.getItem('weather') : defaultWeather})
	const [forecast, setForecast] = useState(()=>{return store.getItem('forecast') ? store.getItem('forecast') : defaultCast})
	useEffect(() => {
		document.documentElement.dataset.theme = theme
		store.setItem('theme', theme)
	}, [theme])
	return (
		<WeatherContext.Provider value={{weather, setWeather,setForecast, forecast}}>
			<LoadingContext.Provider value={{isLoading, setIsLoading}}>
				<LocationContext.Provider value={{location, setLocation}}>
					<ThemeContext.Provider value={{theme, setTheme}}>
						<Container>
							<Sidebar/>
							<Main/>
						</Container>
					</ThemeContext.Provider>
				</LocationContext.Provider>
			</LoadingContext.Provider>
		</WeatherContext.Provider>
	);
}

export default App;
