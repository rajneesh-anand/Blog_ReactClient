import React from "react";
import { isAuthenticated } from "../Auth";

import { AuthContext } from "./index";

const AddCategoryForm = props => {
	const { state, dispatch } = React.useContext(AuthContext);

	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");

	const onClose = e => {
		props.onClose && props.onClose(e);
	};

	const isButtonDisabled =
		name === "" || description === "" || state.isCategorySubmitting;

	const onSubmit = event => {
		event.preventDefault();

		const token = isAuthenticated().token;

		dispatch({
			type: "ADD_CATEGORY_REQUEST"
		});
		const category = {
			name,
			description
		};

		fetch(`${process.env.REACT_APP_API_URL}/category`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": `application/json`
			},
			body: JSON.stringify(category)
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				setName("");
				setDescription("");

				dispatch({
					type: "ADD_CATEGORY_SUCCESS",
					payload: data
				});
				onClose();
			})
			.catch(error => {
				dispatch({
					type: "ADD_CATEGORY_FAILURE"
				});
			});
	};

	return (
		<div style={{ margin: "32px" }}>
			<form onSubmit={onSubmit}>
				<h4>Add Category</h4>
				<div>
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<input
					type="text"
					placeholder="Desciption"
					name="description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<div>
					<button
						type="button"
						id="overlay-confirm-button"
						onClick={onSubmit}
						disabled={isButtonDisabled}
					>
						{state.isCategorySubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddCategoryForm;
