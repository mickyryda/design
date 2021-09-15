import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: []
	},
	reducers: {
		setTodos: (state, { payload }) => {
			state.todos = payload
		},
		addTodo: (state, { payload }) => {
			state.todos.push(payload)
		},
		updateTodo: (state, { payload }) => {
			state.todos = state.todos.map(
				todo => todo.id === payload.id
					? payload
					: todo
			)
		},
		deleteTodo: (state, { payload }) => {
			state.todos = state.todos.filter(
				todo => todo.id !== payload.id
			)
		}
	}
})

export const todosSelector = state => state.todos.todos

export const { 
	setTodos, 
	addTodo, 
	updateTodo, 
	deleteTodo 
} = todosSlice.actions

export default todosSlice.reducer