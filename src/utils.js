export function googleMaps() {
  return new Promise(function(resolve, reject) {
    // callback that runs when map loads
    window.resolveGoogleMapsPromise = function() {
      // resolve object
      resolve(window.google);
      // delete so it can't be called in the console
      delete this.window.resolveGoogleMapsPromise;
    }
    // load google map API with necessary script
    const script = document.createElement("script");
    const API_key = 'AIzaSyDqrfGNgjKre3b3yV0ClFxQuFhGMEZVLZs';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_key}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
}

export function getLocations() {
  let city = 'Seattle, WA';
  let query = 'food';
  let fsURL = 'https://api.foursquare.com/v2/venues/search?client_id=ABVZJGS1CLKO2LTF4JQR1GUWSTPNMGYUMOO4TZZ5FKH4POBS&client_secret=W5ID34W151DL1SB4AWEIXKGENWODC5H215EF4Q0SCLPINGEV&v=20182507%20&limit=50&near=' + city + '&query=' + query + '';
  
  return fetch(fsURL).then(response => response.json())
}

// export function getImages() {
//   return new Promise(function(resolve, reject) {
//     window.resolveGoogleStreetViewPromise = function() {
//       resolve(window.google);
//       delete this.window.resolveGoogleStreetViewPromise;
//     }
//     const script = document.createElement("script");
//     const API_key = 'AIzaSyDqrfGNgjKre3b3yV0ClFxQuFhGMEZVLZs';
//     const secret = 'iq8YTQACQ31mTtU99wl8gRbP5ug=';
//     const location = '';
//     script.src = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location}&heading=151.78&pitch=-0.76&key=${API_key}&signature=${secret}&callback=resolveGoogleStreetViewPromise`;
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);
//   });
// }
  