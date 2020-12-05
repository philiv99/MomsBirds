import log from '../util/log.js'
import config from 'config'

var baseURL = config.IGAPIURL;

function fetchURL(url, method, async, data, headers) {

    var fetchOptions = {
        method: method, 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        redirect: 'follow', 
        referrerPolicy: 'no-referrer'
    };
    var fetchHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (headers){
        fetchHeaders = { ...headers, ...fetchHeaders };
    }
    fetchOptions.headers = fetchHeaders;
    if (data) {
        fetchOptions.body = JSON.stringify(data);
    }
    if (async == false) {
        fetchOptions.async = false;
    }
 
    var fullURL = url.startsWith('http') ? url : `${baseURL}/${url}`;
    return fetch(fullURL, fetchOptions)
            .then((data) => {
                return data ? data.json() : [];
            })
            .catch(function(err) {
                log(`Fetch Error: ${JSON.stringify(err)}`);
            });
}

function get(url, async, headers) {
    return fetchURL(url, 'GET', async, null, headers);
}

function post(url, async, data,  headers) {
    return fetchURL(url, 'POST', async, data, headers);
}

function update(url, async, data,  headers) {
    return fetchURL(url, 'PUT', async, data, headers);
}

function remove(url, async, headers) {
    return fetchURL(url, 'DELETE', async, null, headers);
}

    
export default {
    post: post,
    get: get,
    update: update,
    remove: remove
}