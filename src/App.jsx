import React, { useState, useRef, useEffect } from 'react';
import { CheckSquare2, BoxSelect } from 'lucide-react';
import List from './data/List.js';

export default function App() {
	const todoRef = useRef();
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(List);
	}, []);

	const handleChecked = (id) => {
		setData(
			data.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const todo = todoRef.current.value;
		setData([...data, { id: data.length + 1, title: todo, isDone: false }]);
		todoRef.current.value = '';
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-[#fffffe] container w-screen h-screen flex'>
			<div className='w-1/4'></div>
			<div className='w-2/4  bg-[#bae8e8] border border-[#272343] p-5 py-2 text-center flex flex-col'>
				<div className='h-1/6 flex items-center justify-center'>
					<h1 className='text-[#272343] text-3xl uppercase font-bold font-mono'>
						my to do list
					</h1>
				</div>
				<div className='h-5/6 '>
					<div className='flex justify-center gap-3'>
						<input
							type='text'
							ref={todoRef}
							name='todo'
							className='border border-black w-full'
						/>
						<button type='submit'>Add</button>
					</div>
					<div className=' mt-5' id='list'>
						{data.map((todo) => (
							<div
								className='w-full bg-black text-start text-white p-2 border border-b-black list-none'
								key={todo.id}>
								{todo.title}{' '}
								{todo.isDone ? (
									<input
										type='checkbox'
										checked={todo.isDone}
										onChange={() => handleChecked(todo.id)}
									/>
								) : (
									<input
										type='checkbox'
										checked={todo.isDone}
										onChange={() => handleChecked(todo.id)}
									/>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='w-1/4'></div>
		</form>
	);
}
