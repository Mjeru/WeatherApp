import styles from './Button.module.css'

export function Button({text, onClick, form, type}){
	  return (
		  <button form={form} type={type}   onClick={onClick} id="findButton" className={styles.button}>{text}
		  </button>
	  )
}
