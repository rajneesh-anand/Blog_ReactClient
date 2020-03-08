import React, { useContext, useEffect } from "react";
import CategoryContext from "../../Context/Category/categoryContext";

function CategoryList() {
	const catContext = useContext(CategoryContext);

	const { contacts, getCategories, loading } = catContext;

	useEffect(() => {
		getCategories();
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Add Category</h4>;
	}

	return (
		<div>
			<h4>Category List</h4>
			{contacts !== null ? (
				<ul>
					{contacts.map(contact => (
						<li key={contact._id}>{contact.name}</li>
					))}
				</ul>
			) : (
				<h4>Category null value</h4>
			)}
		</div>
	);
}

export default CategoryList;
