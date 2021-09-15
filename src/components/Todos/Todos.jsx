import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import TodoItem from "../TodoItem/Todoitem";
import Dropdown from "../Dropdown/Dropdown";
import cn from 'classnames'

import {
	addTodo,
	setTodos,
	updateTodo,
	deleteTodo,
	todosSelector
} from '../../features/todos/todosSlice'

import "./Todos.scss";
import api from "../../api";
import { geyKeyCode } from "../../helpers";

const Todos = () => {

	const [filterBy, setFilterBy] = useState('All')
	const [todoTitle, setTodoTitle] = useState('')
	const todos = useSelector(todosSelector)
	const dispatch = useDispatch()

	const filterredTodos = todos.filter(todo => {
		if (filterBy === 'All') return true
		else if (filterBy === 'Done' && todo.completed) return true
		else if (filterBy === 'Undone' && !todo.completed) return true
		return false
	})

	const onDeleteTodo = async todo => {
		let [err] = await api.deleteTodo(todo.id)
		if (err) return console.log('Error while deleting todo.')
		dispatch(deleteTodo(todo))
	}

	const onUpdateTodo = async todo => {
		let [err, updatedTodo] = await api.updateTodo(todo)
		if (err) return console.log('Error while updating todo.')
		dispatch(updateTodo(updatedTodo))
		return [err, updateTodo]
	}

	const onAddTodo = async () => {
		let [err, newTodo] = await api.addTodo({
			title: todoTitle, completed: false
		})
		if (err) return console.log('Error while adding todo.')
		dispatch(addTodo(newTodo))
		setTodoTitle('')
	}

	useEffect(() => {
		const fetchTodos = async () => {
			let [err, todos] = await api.getTodos()
			if (err) return console.log('Error while fetching todos.')
			dispatch(setTodos(todos))
		}
		fetchTodos()
	}, [dispatch])

	return (
		<div className="todos">
			<div className="justify-between">
				<div className="title">Tasks</div>
				<div className=''>
					<Dropdown
						contentClass="filter-menu__content"
						toggler={(onClickToggler) => (
							<button
								onClick={onClickToggler}
								style={{ minWidth: '110px', color: 'black' }}
								className="relative icon-button justify-between"
							>
								<div >{filterBy}</div>
								<i style={{ fontSize: '12px' }} className="fas fa-chevron-down"></i>
							</button>
						)}
					>
						<div className="filter-menu">
							<button className={cn("text-btn", { active: filterBy === 'All' })} onClick={() => setFilterBy('All')} >All</button>
							<button className={cn("text-btn", { active: filterBy === 'Done' })} onClick={() => setFilterBy('Done')} >Done</button>
							<button className={cn("text-btn", { active: filterBy === 'Undone' })} onClick={() => setFilterBy('Undone')} >Undone</button>
						</div>
					</Dropdown>
				</div>
			</div>
			{filterredTodos.map(todo => (
				<TodoItem
					todo={todo}
					key={todo.id}
					onUpdate={onUpdateTodo}
					onDelete={onDeleteTodo}
				/>
			))}
			<div className='add-todo todo-item-card'>
				<input
					value={todoTitle}
					placeholder='Add your todo...'
					onChange={e => setTodoTitle(e.target.value)}
					onKeyDown={e => ['Enter', 13].includes(geyKeyCode(e)) && onAddTodo()}
				/>
			</div>
		</div>
	);
};

export default Todos;
