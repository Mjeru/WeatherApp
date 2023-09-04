import styles from './Progressbar.module.css'

export function Progressbar({width, progress= 50}){
	return (
		<div className={styles.barWrapper}>
			<div className={styles.digitsContainer}>
				<span>0</span>
				<span>50</span>
				<span>100</span>
			</div>
			<div className={styles.barContainer}>
				<div style={{width: `${progress}%`}}  className={styles.bar}></div>
			</div>
			<div className={styles.mesure}><span>%</span></div>
		</div>
	)
}
