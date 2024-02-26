import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
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

	const handleDelete = (id) => {
		setData(data.filter((todo) => todo.id !== id));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const todo = todoRef.current.value.trim();
		if (!todo) {
			alert('Please enter a todo');
			return;
		}
		setData([...data, { id: data.length + 1, title: todo, isDone: false }]);
		todoRef.current.value = '';
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-[#fffffe] container w-screen h-screen flex font-mono'
			autoComplete='off'>
			<div className='w-1/4'></div>
			<div className='w-2/4  bg-[#bae8e8] border border-[#272343] p-5 py-2 text-center flex flex-col'>
				<div className='h-1/6 flex items-center justify-center'>
					<h1 className='text-[#272343] text-3xl uppercase font-bold '>
						my to do list
					</h1>
				</div>
				<div className='h-5/6 '>
					<div className='flex justify-center '>
						<input
							type='text'
							ref={todoRef}
							name='todo'
							className='border border-[#272343] w-full p-1'
							placeholder='Add a new task...'
						/>
						<button
							type='submit'
							className='border border-[#272343] p-2 bg-green-500/50 hover:bg-green-500 text-[#272343]/80 hover:text-[#272343]'>
							<span className='font-bold uppercase'>Add</span>
						</button>
					</div>
					<div className='mt-5' id='list'>
						{data.every((todo) => todo.isDone) && (
							<div className='bg-red-500 p-4 font-bold text-[#272343] my-5'>
								<h1>Create new task!</h1>
							</div>
						)}
						{data.map(
							(todo) =>
								!todo.isDone && (
									<div
										className='w-full bg-[#fffffe] text-start text-[#272343] p-2 border border-b-[#272343] flex justify-between'
										key={todo.id}>
										<div className='flex gap-2'>
											<input
												type='checkbox'
												checked={todo.isDone}
												onChange={() => handleChecked(todo.id)}
											/>
											{todo.title}
										</div>
										<button onClick={() => handleDelete(todo.id)}>
											<Trash2 />
										</button>
									</div>
								)
						)}
						<div className='text-[#272343] my-5 text-lg font-bold'>
							<h1>Finished tasks</h1>
						</div>
						{data.every((todo) => !todo.isDone) && (
							<div className='bg-red-500 p-4 font-bold text-[#272343] my-5'>
								<h1>No finished tasks to display</h1>
							</div>
						)}
						{data.map(
							(todo) =>
								todo.isDone && (
									<div
										className='w-full bg-[#fffffe] text-start text-[#272343] p-2 border border-b-[#272343] flex justify-between'
										key={todo.id}>
										<div className='flex gap-2'>
											<input
												type='checkbox'
												checked={todo.isDone}
												onChange={() => handleChecked(todo.id)}
											/>
											{todo.title}
										</div>
										<button onClick={() => handleDelete(todo.id)}>
											<Trash2 />
										</button>
									</div>
								)
						)}
					</div>
				</div>
			</div>
			<div className='w-1/4'></div>
		</form>
	);
}
