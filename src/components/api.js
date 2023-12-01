const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
      authorization: 'afa88d83-d34b-4e5e-9a10-32caf87badd8',
      'Content-Type': 'application/json'
    }
}

export const getProfileInfo = () => {
    return fetch(config.baseUrl + '/users/me', {
            method: 'GET',
            headers: config.headers
    }).then(res => handleResponse(res));
}

export const getInitialCards = () => {
    return fetch(config.baseUrl + '/cards', {
            method: 'GET',
            headers: config.headers
    }).then(res => handleResponse(res));
} 

export const changeProfileInfo = (name, about) => {
    return fetch(config.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
    }).then(res => handleResponse(res));
}

export const addCard = (name, link) => {
    return fetch(config.baseUrl + '/cards', {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
    }).then(res => handleResponse(res));
}

export const deleteCard = (id) => {
    return fetch(config.baseUrl + '/cards/' + id, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => handleResponse(res));
}

export const changeAvatar = (link) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar:link
            })
    }).then(res => handleResponse(res));
}

export const addLike = (id) => {
    return fetch(config.baseUrl + '/cards/likes/' + id, {
            method: 'PUT',
            headers: config.headers,
        }).then(res => handleResponse(res));
}

export const deleteLike = (id) => {
    return fetch(config.baseUrl + '/cards/likes/' + id, {
            method: 'DELETE',
            headers: config.headers,
        }).then(res => handleResponse(res));
}

const handleResponse = (resp) => {
    if (resp.ok) {
        return resp.json();
    } else {
        return Promise.reject(`Ошибка: ${resp.status}`);
    };
}