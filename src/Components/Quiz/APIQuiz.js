export const create = (userId, token, quiz) => {
	console.log("posts", quiz);
	console.log(`${process.env.REACT_APP_API_URL}/quiz/new/${userId}`);
	return fetch(`${process.env.REACT_APP_API_URL}/quiz/new/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`
		},
		body: quiz
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
