import API_URL from '../config';
export { useFetchWrapper };

function useFetchWrapper() {
  const auth = localStorage.getItem('access_token')
  // const auth = useRecoilState(authAtom);
  // const alertActions = useAlertActions();

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method) {
    return (url, body, file = false) => {
      const baseUrl = API_URL.API_URL;
      url = `${baseUrl}/${url}`;
      const requestOptions = {
        method,
        headers: authHeader(url),
      };
      if (body && file == false) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      } else {
        requestOptions.body = body;
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(API_URL.API_URL);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response) {
    return response.text().then((text) => {
      if (response.status == 500) {
        alert('500 error')
      }
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          alert('Signature has expired')
          localStorage.removeItem('user');
          // history.push('/account/login');
          window.location.href = '/login';
        }
        if ([500].includes(response.status) && auth) {
          alert('500 Internal Server Error')
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
}
