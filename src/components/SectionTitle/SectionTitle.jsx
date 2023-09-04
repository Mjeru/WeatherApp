import styles from './SectionTitle.module.css';

export function SectionTitle({title, children}) {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</div>
	)


}
