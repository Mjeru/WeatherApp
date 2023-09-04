import styles from './Loader.module.css'
export function Loader({currentClass}){
	return (
		<div className={`${styles.ldsEllipsis} ${currentClass}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
