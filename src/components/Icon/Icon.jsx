
export function Icon({name}) {
	let iconSvg = (<></>)
	switch (name) {
		case 'arrow': {
			iconSvg = (<svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">\n' +
				'<path d="M2.09312 0L0 1.7625L6.79892 7.5L0 13.2375L2.09312 15L11 7.5L2.09312 0Z" fill="#ACACAC"/>\n' +
				'</svg>)
			break
		}
		default: {
			break
		}
	}
	return (iconSvg)
}
