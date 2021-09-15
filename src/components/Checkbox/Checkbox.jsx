import React, { useState } from 'react'
import './Checkbox.scss'

const Checkbox = ({ children, value = false, onChange }) => {
	const [id] = useState(
		Math
			.random()
			.toString(36)
			.slice(-10)
	)

	return (
		<div className="checkbox">
			<input
				id={id}
				value={value}
				type="checkbox"
				checked={value}
				style={{ display: 'none' }}
				className="checkbox__input"
				onChange={() => onChange && onChange(!value)}
			/>
			<label className="checkbox__label" htmlFor={id}>
				<span>
					<svg width="12px" height="9px" viewBox="0 0 12 9">
						<polyline points="1 5 4 8 11 1"></polyline>
					</svg>
				</span>
				<span className='checkbox__label-text'>{children}</span>
			</label>
		</div>
	)
}

export default Checkbox
