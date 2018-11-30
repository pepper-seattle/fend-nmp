function errorAlert() {
  alert('Google Maps could not be returned. Please refresh or try again later.');
}

export function googleMaps() {
  return new Promise(function(resolve) {
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
    script.onerror = errorAlert;
    document.body.appendChild(script);
  });
}

export function getLocations() {
  let city = 'Seattle, WA';
  let query = 'food';
  let fsURL = 'https://api.foursquare.com/v2/venues/search?client_id=ABVZJGS1CLKO2LTF4JQR1GUWSTPNMGYUMOO4TZZ5FKH4POBS&client_secret=W5ID34W151DL1SB4AWEIXKGENWODC5H215EF4Q0SCLPINGEV&v=20182507%20&limit=50&near=' + city + '&query=' + query + '';
  
  return fetch(fsURL).then(response => response.json());
}

export function getImages(venue) {
    const API_key = 'AIzaSyDqrfGNgjKre3b3yV0ClFxQuFhGMEZVLZs';
    const { lat, lng } = venue.location;
    return `https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=${API_key}`;
}

