export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/category/news`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
