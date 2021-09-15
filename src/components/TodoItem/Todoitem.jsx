import React, { useState } from 'react'
import { geyKeyCode } from '../../helpers'
import Checkbox from '../Checkbox/Checkbox'
import Dropdown from '../Dropdown/Dropdown'

import './TodoItem.scss'

const TodoItem = ({ todo, onUpdate, onDelete }) => {

	const [updateData, setUpdateData] = useState('')
	const [isUpdating, setIsUpdating] = useState(false)

	const onCancelEdit = () => {
		setIsUpdating(false)
		setUpdateData('')
	}

	const onClickEdit = () => {
		setIsUpdating(true)
		setUpdateData(todo.title)
	}

	const onUpdateTodo = async () => {
		if (!onUpdate) return
		let [err] = await onUpdate({
			...todo, title: updateData
		})
		if (!err) onCancelEdit()
	}

	return (
		<div className='todo-item-card'>
			<div>
				<Checkbox
					value={todo.completed}
					onChange={v => onUpdate && onUpdate({ ...todo, completed: v })}
				>
					{isUpdating ? <input
						autoFocus
						type="text"
						value={updateData}
						onBlur={onCancelEdit}
						className='todo-update-input'
						onChange={e => setUpdateData(e.target.value)}
						onKeyDown={e => ['Enter', 13].includes(geyKeyCode(e)) && onUpdateTodo()}
					/> : todo.title}
				</Checkbox>
			</div>
			<div>
				<Dropdown contentClass="" toggler={onClickToggler => (
					<button onClick={onClickToggler} className="relative icon-button">
						<i className="fa fa-ellipsis-h"></i>
					</button>
				)}>
					<div className='menu'>
						<button className='text-btn' onClick={onClickEdit}>Edit</button>
						<button className='text-btn delete' onClick={() => onDelete(todo)}>Delete</button>
					</div>
				</Dropdown>
			</div>
		</div>
	)
}

export default TodoItem
