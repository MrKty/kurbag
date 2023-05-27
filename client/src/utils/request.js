const sendRequest = (url, method, data, callback) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        if (url !== "login" && url !== "signup" && url !== "create-organization") {
            data = {
                ...data,
                id: localStorage.getItem('userId')
            }
        }
        options.body = JSON.stringify(data);
    }

    fetch("http://localhost:5000/" + url, options)
        .then((response) => response.json())
        .then((data) => {
            if (callback) {
                callback(data);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export default sendRequest;