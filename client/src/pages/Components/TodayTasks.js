import React, { useState } from "react";
import { MdEditNote, MdDone, MdDeleteOutline } from "react-icons/Md";
export function TodayTasks({ task, setTodayTasks, handleAddNewTask, index }) {
	const [todayValue, setTodayValue] = useState(task.task);
	const [isDisable, setIsDisable] = useState(true);
	function handleChange(event) {
		setTodayValue(event.target.value);
		setTodayTasks((prev) => {
			const updatedData = [...prev];
			updatedData[index].task = event.target.value;
			return updatedData;
		});
	}
	function handleDelete(index) {
		setTodayTasks((prev) => {
			const updatedData = [...prev];
			updatedData.splice(index, 1);
			return updatedData;
		});
	}
	return (
		<li>
			<input
				type="text"
				name="today"
				placeholder="Enter for new task..."
				value={todayValue}
				onChange={handleChange}
				disabled={isDisable}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleChange(event);
					}
				}}
			/>
			<button
				style={{ cursor: "pointer" }}
				type="button"
				onClick={() => setIsDisable((prev) => !prev)}
			>
				<MdEditNote />
			</button>
			{!isDisable && (
				<button
					style={{ cursor: "pointer" }}
					type="button"
					onClick={() => setIsDisable((prev) => !prev)}
				>
					<MdDone />
				</button>
			)}
			<button
				style={{ cursor: "pointer" }}
				type="button"
				onClick={() => handleDelete(index)}
			>
				<MdDeleteOutline />
			</button>
		</li>
	);
}
//ADD NEW TASK
export function NewTask({ handleAddNewTask }) {
	const [todayValue, setTodayValue] = useState("");
	function handleChange(event) {
		setTodayValue(event.target.value);
	}

	return (
		<input
			type="text"
			autoFocus
			name="newTask"
			placeholder="Enter for new task..."
			value={todayValue}
			onChange={handleChange}
			// disabled={true}
			onKeyPress={(event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					handleAddNewTask(todayValue);
					setTodayValue("");
				}
			}}
		/>
	);
}
