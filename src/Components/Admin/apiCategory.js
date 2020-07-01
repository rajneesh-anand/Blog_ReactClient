export const create = (category, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/category`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(category)
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const categoryList = () => {
	return (
		fetch(`${process.env.REACT_APP_API_URL}/categories`, {
			method: "GET"
		})
			.then(response => {
				return response.json();
			})
			// .then(data => {
			// 	return data.data;
			// })
			.catch(error => {
				console.log(error);
			})
	);
};
