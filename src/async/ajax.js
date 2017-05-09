
import 'whatwg-fetch'
var _server = '';
export function setServer(server) { _server = server; }
export default function api(endpoint, method, callBack) {

  var formData = null

  var headers = { 'Accept': 'application/json' }

  var params = {
    method: method,
    mode: 'cors',
    headers: new Headers(headers)
  }

  var responseObj = null;
  fetch(_server + endpoint, params).then((response) => {    
    responseObj = response;
    return response.json();
  }).then((data) => {    
    callBack(data, responseObj.status);
  });
}