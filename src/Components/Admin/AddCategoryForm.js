import React, { useState, useContext, useEffect } from "react";
import CategoryContext from "../../Context/Category/categoryContext";
import { isAuthenticated } from "../Auth";

const AddCategoryForm = () => {
	const categoryContext = useContext(CategoryContext);

	const { addCategory, error } = categoryContext;

	const [alert, setAlert] = useState("");

	useEffect(() => {
		setAlert(error);
	}, [error]);

	const [category, setCategory] = useState({
		name: "",
		description: ""
	});

	// const isValid = () => {
	// 	const { name, description } = category;

	// 	if (name.length === 0 || description.length === 0) {
	// 		setError("All fields are required");
	// 		return false;
	// 	}

	// 	return true;
	// };

	const { name, description } = category;

	const onChange = e => {
		setCategory({ ...category, [e.target.name]: e.target.value });
		setAlert("");
	};

	const onSubmit = e => {
		e.preventDefault();
		const token = isAuthenticated().token;

		if (name.length === 0 || name === "") {
			setAlert("all fields required");
		} else {
			addCategory(category, token);
			setCategory({ name: "", description: "" });
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<h4>Add Category</h4>
			<div>
				<input
					type="text"
					placeholder="Name"
					name="name"
					value={name}
					onChange={onChange}
				/>
			</div>
			<input
				type="text"
				placeholder="Desciption"
				name="description"
				value={description}
				onChange={onChange}
			/>

			<div>
				<button type="submit">Save</button>
			</div>
			<div>{alert !== null ? alert : ""}</div>
		</form>
	);
};

export default AddCategoryForm;
