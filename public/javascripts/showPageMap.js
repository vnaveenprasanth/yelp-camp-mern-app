mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 20, // starting zoom
});


new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset : 10})
            .setHTML(
                `<h2>${campground.title}</h2>`
            )
    )
    .addTo(map)