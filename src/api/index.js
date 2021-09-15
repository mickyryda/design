import axios from 'axios'
const axi = axios.create({
	baseURL: 'https://todos-json-server.herokuapp.com'
})

const handler = async request => {
	try { return [null, (await request).data] }
	catch (e) { return [e.response ? e.response : e] }
}

const api = {
	getTodos: () => handler(axi.get('/todos')),
	addTodo: (todo) => handler(axi.post('/todos', todo)),
	updateTodo: (todo) => handler(axi.put('/todos/' + todo.id, todo)),
	deleteTodo: (todoId) => handler(axi.delete('/todos/' + todoId))
}

export default api