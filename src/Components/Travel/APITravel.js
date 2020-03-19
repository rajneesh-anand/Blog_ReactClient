export const quizByStatus = (status, page) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/quiz/${status}/?page=${page}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}
	)
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const like = (userId, token, quizId, likeId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/quiz/like`, {
		method: "PUT",
		body: JSON.stringify({ userId, quizId, likeId }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			// console.log(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const unlike = (userId, token, quizId, likeId) => {
	console.log(userId, quizId, likeId);
	return fetch(`${process.env.REACT_APP_API_URL}/quiz/unlike`, {
		method: "PUT",
		body: JSON.stringify({ userId, quizId, likeId }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			// console.log(response);
			return response.json();
		})
		.catch(err => console.log(err));
};

export const comment = (userId, token, quizId, comment) => {
	console.log(userId + "    " + quizId);
	return fetch(`${process.env.REACT_APP_API_URL}/quiz/comment`, {
		method: "PUT",
		body: JSON.stringify({ userId, quizId, comment }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const uncomment = (userId, token, quizId, comment) => {
	return fetch(`${process.env.REACT_APP_API_URL}/quiz/uncomment`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId, quizId, comment })
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
