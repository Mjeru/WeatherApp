export function documentHeightFix(){
	const documentHeight = () => {
		const doc = document.documentElement
		if (window.innerWidth < 856){
			doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
		}
	}
	window.addEventListener('resize', documentHeight);
	documentHeight();
}
