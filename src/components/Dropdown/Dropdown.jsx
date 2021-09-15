import { useRef, useState } from "react"
import cn from 'classnames'
import './Dropdown.scss'

const Dropdown = ({ children, contentClass, toggler, keepMounted }) => {

	const wrapperEl = useRef(null)
	const [state, setState] = useState({
		show: false,
		hidden: true
	})

	const onMouseDown = event => {
		if (wrapperEl && (wrapperEl.current && !wrapperEl.current.contains(event.target))) {
			hideDropdown()
		}
	}

	const showDropdown = () => {
		setState({ show: true, hidden: false })
		document.addEventListener("mousedown", onMouseDown)
	}

	const hideDropdown = () => {
		setState(s => ({ ...s, show: false }))
		document.removeEventListener("mousedown", onMouseDown)
		setTimeout(() => (setState(s => ({ ...s, hidden: true }))), 300);
	}

	const onClickToggler = () => {
		if (state.show) hideDropdown()
		else showDropdown()
	}

	return (
		<div ref={wrapperEl} className=' dropdown'>
			{toggler(onClickToggler)}
			<div className={cn(contentClass, 'dropdown__content', {
				'dropdown__content-visible': state.show
			})}>
				{(!state.hidden || keepMounted) && children}
			</div>
		</div>
	)
}

export default Dropdown