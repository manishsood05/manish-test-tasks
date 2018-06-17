const URL = "https://pokeapi.co/api/v2";

class API {

  static loadPokemons(limit, offset){
    return fetch(URL+'/pokemon/?limit='+limit+'&offset='+offset)
    .then(response => response.json())
    .then(responseData => {
      return responseData;
    })
    .catch(error => {
      return error;
    });
  }

  static loadUrl(url){
    return fetch(url)
    .then(response => response.json())
    .then(responseData => {
      return responseData;
    })
    .catch(error => {
      return error;
    });
  }

}

export default API;
