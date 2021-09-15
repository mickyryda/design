import Todos from './components/Todos/Todos'
import Progressbar from './components/progressBar'
import { useSelector } from 'react-redux'
import { todosSelector } from './features/todos/todosSlice'

const App = () => {

	const todos = useSelector(todosSelector)
	const completedTodos = todos.filter(todo => todo.completed)
	const progress = (completedTodos.length / todos.length) * 100

	return (
		<div className='card'>
			<div className='card-inner-content'>
				<div className='progress-bar-card'>
					<span className='title'>Progress</span>
					<div>
						<Progressbar bgcolor="white" progress={progress} />
					</div>
					<span className='subtitle'>{completedTodos.length} completed</span>
				</div>
				<Todos />
			</div>
		</div>
	);
}

export default App;
