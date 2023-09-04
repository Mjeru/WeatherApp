import styles from './Main.module.css'
import {SectionTitle} from "../SectionTitle/SectionTitle";
import {Forecast} from "../Forecast/Forecast";
import {Details} from "../Detalis/Details";

export function Main() {
	return (
		<section className={styles.main}>
			<div className={styles.main__container}>
				<Forecast/>
				<SectionTitle title={'Подробно на сегодня'}/>
				<Details/>
			</div>
		</section>
	)
}
