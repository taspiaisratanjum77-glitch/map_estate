

const ORS_API_KEY = "YOUR_API_KEY_HERE";




const ORS_BASE_URL =
    "https://api.heigit.org";





const properties = [

    {
        id: 1,

        title:
            "Modern 2 Bedroom Apartment",

        area:
            "Banani",

        address:
            "Banani DOHS, Dhaka",

        price:
            60000,

        bedrooms:
            2,

        bathrooms:
            2,

        size:
            1200,

        floor:
            5,

        totalFloors:
            8,

        parking:
            true,

        lift:
            true,

        security:
            true,

        latitude:
            23.7937,

        longitude:
            90.4066,

        images: [
            "images/main 1.jpg",
            "images/main 1 1.jpg",
            "images/main 1 2.jpg",
            "images/main 1 3.jpg"
        ],

        description:
            "A modern apartment located in Banani DOHS with easy access to major roads, shopping areas and restaurants."
    },


    {
        id: 2,

        title:
            "Family Apartment",

        area:
            "Gulshan",

        address:
            "Gulshan 2, Dhaka",

        price:
            75000,

        bedrooms:
            3,

        bathrooms:
            2,

        size:
            1500,

        floor:
            7,

        totalFloors:
            10,

        parking:
            true,

        lift:
            true,

        security:
            true,

        latitude:
            23.7925,

        longitude:
            90.4078,

        images: [
            "images/main 2.jpg",
            "images/main 2 1.jpg",
            "images/main 2 2.jpg",
            "images/main 2 3.jpg"
        ],

        description:
            "A spacious family apartment in Gulshan with modern facilities and excellent connectivity."
    },


    {
        id: 3,

        title:
            "Cozy Studio Apartment",

        area:
            "Mohakhali",

        address:
            "Mohakhali, Dhaka",

        price:
            40000,

        bedrooms:
            1,

        bathrooms:
            1,

        size:
            700,

        floor:
            3,

        totalFloors:
            6,

        parking:
            false,

        lift:
            true,

        security:
            true,

        latitude:
            23.7772,

        longitude:
            90.4005,

        images: [
            "images/main 3.jpg",
            "images/main 3 1.jpg",
            "images/main 3 2.jpg",
            "images/main 3 3.jpg"
        ],

        description:
            "A comfortable studio apartment suitable for students and working professionals."
    },


    {
        id: 4,

        title:
            "Luxury Apartment",

        area:
            "Dhanmondi",

        address:
            "Dhanmondi 27, Dhaka",

        price:
            95000,

        bedrooms:
            3,

        bathrooms:
            3,

        size:
            1800,

        floor:
            8,

        totalFloors:
            12,

        parking:
            true,

        lift:
            true,

        security:
            true,

        latitude:
            23.7461,

        longitude:
            90.3742,

        images: [
            "images/main 4.jpg",
            "images/main 4 1.jpg",
            "images/main 4 2.jpg",
            "images/main 4 3.jpg"
        ],

        description:
            "A premium luxury apartment with spacious rooms, parking and modern building facilities."
    }

];




const propertyList =
    document.getElementById(
        "property-list"
    );


const propertyCount =
    document.getElementById(
        "property-count"
    );


const areaFilter =
    document.getElementById(
        "area-filter"
    );


const workplaceInput =
    document.getElementById(
        "workplace"
    );


const searchButton =
    document.getElementById(
        "search-button"
    );




const propertyModal =
    document.getElementById(
        "property-modal"
    );


const closeModal =
    document.getElementById(
        "close-modal"
    );


const modalMainImage =
    document.getElementById(
        "modal-main-image"
    );


const modalThumbnails =
    document.getElementById(
        "modal-thumbnails"
    );


const modalTitle =
    document.getElementById(
        "modal-title"
    );


const modalLocation =
    document.getElementById(
        "modal-location"
    );


const modalPrice =
    document.getElementById(
        "modal-price"
    );


const modalBedrooms =
    document.getElementById(
        "modal-bedrooms"
    );


const modalBathrooms =
    document.getElementById(
        "modal-bathrooms"
    );


const modalSize =
    document.getElementById(
        "modal-size"
    );


const modalFloor =
    document.getElementById(
        "modal-floor"
    );


const modalAmenities =
    document.getElementById(
        "modal-amenities"
    );


const modalDescription =
    document.getElementById(
        "modal-description"
    );


const modalCommuteTime =
    document.getElementById(
        "modal-commute-time"
    );


const modalCommuteDistance =
    document.getElementById(
        "modal-commute-distance"
    );


const viewMapButton =
    document.getElementById(
        "view-map-button"
    );


const favoriteButton =
    document.getElementById(
        "favorite-button"
    );




const map =
    L.map("map").setView(
        [23.7806, 90.4070],
        12
    );


L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ"
    }
).addTo(map);





let propertyMarkers = [];

let workplaceMarker = null;

let routeLayer = null;

let workplaceCoordinates = null;

let selectedProperty = null;//stop





function displayPropertyMarkers(
    propertyArray = properties
) {


    

    propertyMarkers.forEach(
        function(marker) {

            map.removeLayer(
                marker
            );

        }
    );


    propertyMarkers = [];




    propertyArray.forEach(
        function(property) {


            const marker =
                L.marker([

                    property.latitude,

                    property.longitude

                ]).addTo(map);


        

            marker.bindPopup(`

                <strong>
                    ${property.title}
                </strong>

                <br>

                ${property.area}

                <br>

                ৳${property.price.toLocaleString()}

            `);




            marker.on(
                "click",
                function() {

                    openPropertyModal(
                        property
                    );

                    showRoute(
                        property
                    );

                }
            );


            propertyMarkers.push(
                marker
            );

        }
    );

}




function displayProperties(
    propertyArray = properties
) {


    propertyList.innerHTML = "";


    propertyArray.forEach(
        function(property) {


            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "property-card"
            );



            if (
                selectedProperty &&
                selectedProperty.id === property.id
            ) {

                card.classList.add(
                    "selected"
                );

            }


            

            let commuteHTML =
                "Search workplace to calculate";


            if (
                property.commuteDuration !== undefined
            ) {

                commuteHTML = `

                    🚗

                    ${formatDuration(
                        property.commuteDuration
                    )}

                    •

                    ${formatDistance(
                        property.commuteDistance
                    )}

                `;

            }


        
            card.innerHTML = `

                <img

                    src="${property.images[0]}"

                    alt="${property.title}"

                    class="property-card-image"

                >


                <h3>

                    ${property.title}

                </h3>


                <p
                    class="property-card-price"
                >

                    ৳${property.price.toLocaleString()}

                    / month

                </p>


                <p>

                    📍 ${property.address}

                </p>


                <div
                    class="property-card-meta"
                >

                    <span>
                        🛏️
                        ${property.bedrooms}
                        bed
                    </span>


                    <span>
                        🚿
                        ${property.bathrooms}
                        bath
                    </span>


                    <span>
                        📐
                        ${property.size}
                        sq ft
                    </span>

                </div>


                <p
                    class="commute-info"
                >

                    ${commuteHTML}

                </p>

            `;


        
            card.addEventListener(
                "click",
                async function() {


                    openPropertyModal(
                        property
                    );


                    

                    if (
                        workplaceCoordinates
                    ) {

                        try {

                            await showRoute(
                                property
                            );

                        } catch (error) {

                            console.error(
                                error
                            );

                        }

                    }

                }
            );


            propertyList.appendChild(
                card
            );

        }
    );


    propertyCount.textContent =
        `${propertyArray.length} properties`;

}




const knownDhakaLocations = {
    "banani": { latitude: 23.7937, longitude: 90.4066 },
    "gulshan": { latitude: 23.7925, longitude: 90.4078 },
    "mohakhali": { latitude: 23.7772, longitude: 90.4005 },
    "dhanmondi": { latitude: 23.7461, longitude: 90.3742 },
    "motijheel": { latitude: 23.7330, longitude: 90.4172 },
    "uttara": { latitude: 23.8759, longitude: 90.3795 },
    "mirpur": { latitude: 23.8223, longitude: 90.3654 },
    "kawran bazar": { latitude: 23.7516, longitude: 90.3944 },
    "karwan bazar": { latitude: 23.7516, longitude: 90.3944 },
    "badda": { latitude: 23.7806, longitude: 90.4267 },
    "baridhara": { latitude: 23.8016, longitude: 90.4233 },
    "farmgate": { latitude: 23.7588, longitude: 90.3888 },
    "shahbagh": { latitude: 23.7389, longitude: 90.3958 }
};

function getKnownDhakaLocation(address) {
    const lower = address.toLowerCase();
    for (const [name, coords] of Object.entries(knownDhakaLocations)) {
        if (lower.includes(name)) {
            return coords;
        }
    }
    return { latitude: 23.7806, longitude: 90.4070 };
}

async function geocodeWorkplace(
    address
) {
    if (!ORS_API_KEY || ORS_API_KEY === "YOUR_API_KEY_HERE") {
        return getKnownDhakaLocation(address);
    }

    try {
        const url =
            ORS_BASE_URL +
            "/pelias/v1/search" +
            "?api_key=" +
            encodeURIComponent(ORS_API_KEY) +
            "&text=" +
            encodeURIComponent(address);

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                return {
                    longitude: coordinates[0],
                    latitude: coordinates[1]
                };
            }
        }
    } catch (err) {
        console.warn("Geocoding API unavailable, using local lookup:", err);
    }

    return getKnownDhakaLocation(address);
}





function calculateSimulatedCommute(workplace) {
    const distances = [[]];
    const durations = [[]];
    properties.forEach(function(p) {
        const R = 6371e3;
        const φ1 = workplace.latitude * Math.PI / 180;
        const φ2 = p.latitude * Math.PI / 180;
        const Δφ = (p.latitude - workplace.latitude) * Math.PI / 180;
        const Δλ = (p.longitude - workplace.longitude) * Math.PI / 180;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const directDist = R * c;
        const drivingDist = Math.max(500, Math.round(directDist * 1.35));
        const durationSec = Math.round(drivingDist / 5.55); // ~20 km/h traffic speed

        distances[0].push(drivingDist);
        durations[0].push(durationSec);
    });
    return { distances, durations };
}

async function calculateCommuteTimes(
    workplace
) {
    if (!ORS_API_KEY || ORS_API_KEY === "YOUR_API_KEY_HERE") {
        return calculateSimulatedCommute(workplace);
    }

    try {
        const locations = [
            [workplace.longitude, workplace.latitude],
            ...properties.map(function(property) {
                return [property.longitude, property.latitude];
            })
        ];

        const destinations = properties.map(function(_, index) {
            return index + 1;
        });

        const response = await fetch(
            ORS_BASE_URL + "/openrouteservice/v2/matrix/driving-car",
            {
                method: "POST",
                headers: {
                    "Authorization": ORS_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    locations: locations,
                    sources: [0],
                    destinations: destinations,
                    metrics: ["distance", "duration"]
                })
            }
        );

        if (response.ok) {
            return await response.json();
        }
    } catch (err) {
        console.warn("Matrix API unavailable, using simulation:", err);
    }

    return calculateSimulatedCommute(workplace);
}




function applyCommuteData(
    data
) {


    properties.forEach(
        function(property, index) {


            const distance =
                data.distances[0][index];


            const duration =
                data.durations[0][index];


            property.commuteDistance =
                distance;


            property.commuteDuration =
                duration;

        }
    );

}





function formatDistance(
    meters
) {


    if (
        meters < 1000
    ) {

        return (
            Math.round(meters) +
            " m"
        );

    }


    return (

        (meters / 1000)
            .toFixed(1)

        + " km"

    );

}





function formatDuration(
    seconds
) {


    const minutes =
        Math.round(
            seconds / 60
        );


    if (
        minutes < 60
    ) {

        return `${minutes} min`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    const remainingMinutes =
        minutes % 60;


    return `${hours}h ${remainingMinutes}min`;

}





function getCommuteCategory(
    minutes
) {


    if (
        minutes <= 20
    ) {

        return "Excellent";

    }


    if (
        minutes <= 35
    ) {

        return "Good";

    }


    if (
        minutes <= 50
    ) {

        return "Moderate";

    }


    return "Poor";

}





searchButton.addEventListener(
    "click",
    async function() {


        const address =
            workplaceInput.value.trim();


        if (!address) {

            alert(
                "Please enter a workplace address."
            );

            return;

        }


        try {


            searchButton.disabled =
                true;


            searchButton.textContent =
                "Searching...";


    

            const workplace =
                await geocodeWorkplace(
                    address
                );


            workplaceCoordinates =
                workplace;


            console.log(
                "Workplace:",
                workplace
            );




            if (
                workplaceMarker
            ) {

                map.removeLayer(
                    workplaceMarker
                );

            }




            workplaceMarker =
                L.marker([

                    workplace.latitude,

                    workplace.longitude

                ])
                .addTo(map)
                .bindPopup(
                    "🏢 Workplace"
                )
                .openPopup();




            map.setView(

                [

                    workplace.latitude,

                    workplace.longitude

                ],

                13

            );




            searchButton.textContent =
                "Calculating...";


            const commuteData =
                await calculateCommuteTimes(
                    workplace
                );




            applyCommuteData(
                commuteData
            );




            const selectedArea =
                areaFilter.value;


            if (
                selectedArea === "all"
            ) {

                displayProperties(
                    properties
                );

            } else {

                const filtered =
                    properties.filter(
                        function(property) {

                            return (
                                property.area ===
                                selectedArea
                            );

                        }
                    );


                displayProperties(
                    filtered
                );

            }


        } catch (error) {


            console.error(
                error
            );


            alert(
                error.message
            );


        } finally {


            searchButton.disabled =
                false;


            searchButton.textContent =
                "Search";

        }

    }
);





async function showRoute(
    property
) {


    if (
        !workplaceCoordinates
    ) {

        alert(
            "Please search your workplace first."
        );

        return;

    }


    try {
        if (!ORS_API_KEY || ORS_API_KEY === "YOUR_API_KEY_HERE") {
            drawFallbackRoute(property);
            return;
        }

    
        const response =
            await fetch(
                ORS_BASE_URL +
                "/openrouteservice/v2/" +
                "directions/driving-car/geojson",
                {
                    method: "POST",
                    headers: {
                        "Authorization": ORS_API_KEY,
                        "Content-Type": "application/json",
                        "Accept": "application/geo+json"
                    },
                    body: JSON.stringify({
                        coordinates: [
                            [
                                workplaceCoordinates.longitude,
                                workplaceCoordinates.latitude
                            ],
                            [
                                property.longitude,
                                property.latitude
                            ]
                        ]
                    })
                }
            );

        if (!response.ok) {
            drawFallbackRoute(property);
            return;
        }

        const route =
            await response.json();

    
        if (routeLayer) {
            map.removeLayer(routeLayer);
        }

        /*
            Draw route
        */
        routeLayer =
            L.geoJSON(route, {
                style: {
                color: "#007bff",
            weight: 5,
                    opacity: 0.85
                }
            }).addTo(map);

        map.fitBounds(
            routeLayer.getBounds(),
            { padding: [40, 40] }
        );

        highlightPropertyMarker(property);

    } catch (error) {
        console.warn("API route failed, using straight-line route:", error);
        drawFallbackRoute(property);
    }
}

function drawFallbackRoute(property) {
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }

    const latlngs = [
        [workplaceCoordinates.latitude, workplaceCoordinates.longitude],
        [property.latitude, property.longitude]
    ];

    routeLayer = L.polyline(latlngs, {
        color: "#007bff",
        weight: 5,
        opacity: 0.8,
        dashArray: "10, 10"
    }).addTo(map);

    map.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });
    highlightPropertyMarker(property);
}

function highlightPropertyMarker(property) {
    propertyMarkers.forEach(function(marker) {
        const position = marker.getLatLng();
        if (
            Math.abs(position.lat - property.latitude) < 0.0001 &&
            Math.abs(position.lng - property.longitude) < 0.0001
        ) {
            marker.openPopup();
        }
    });
}





function openPropertyModal(
    property
) {


    selectedProperty =
        property;


    

    propertyModal.classList.add(
        "active"
    );


    

    modalTitle.textContent =
        property.title;


    modalLocation.textContent =
        property.address;


    modalPrice.textContent =
        `৳${property.price.toLocaleString()} / month`;


    modalBedrooms.textContent =
        property.bedrooms;


    modalBathrooms.textContent =
        property.bathrooms;


    modalSize.textContent =
        property.size;


    modalFloor.textContent =
        `${property.floor}/${property.totalFloors}`;


    modalDescription.textContent =
        property.description;




    if (
        property.commuteDuration !== undefined
    ) {


        const minutes =
            Math.round(
                property.commuteDuration / 60
            );


        modalCommuteTime.textContent =
            formatDuration(
                property.commuteDuration
            );


        modalCommuteDistance.textContent =
            formatDistance(
                property.commuteDistance
            );


    } else {


        modalCommuteTime.textContent =
            "Search workplace";


        modalCommuteDistance.textContent =
            "--";

    }



    

    modalMainImage.src =
        property.images[0];



    

    modalThumbnails.innerHTML =
        "";


    property.images.forEach(
        function(image, index) {


            const thumbnail =
                document.createElement(
                    "img"
                );


            thumbnail.src =
                image;


            thumbnail.alt =
                `${property.title} image ${index + 1}`;


            thumbnail.classList.add(
                "modal-thumbnail"
            );


            if (
                index === 0
            ) {

                thumbnail.classList.add(
                    "active"
                );

            }


            thumbnail.addEventListener(
                "click",
                function(event) {


                    event.stopPropagation();


                    modalMainImage.src =
                        image;


                    document
                        .querySelectorAll(
                            ".modal-thumbnail"
                        )
                        .forEach(
                            function(item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    thumbnail.classList.add(
                        "active"
                    );

                }
            );


            modalThumbnails.appendChild(
                thumbnail
            );

        }
    );



    
    modalAmenities.innerHTML =
        "";


    const amenities = [];


    if (
        property.parking
    ) {

        amenities.push(
            "🚗 Parking"
        );

    }


    if (
        property.lift
    ) {

        amenities.push(
            "🛗 Lift"
        );

    }


    if (
        property.security
    ) {

        amenities.push(
            "🔐 Security"
        );

    }


    amenities.forEach(
        function(amenity) {


            const tag =
                document.createElement(
                    "span"
                );


            tag.classList.add(
                "amenity-tag"
            );


            tag.textContent =
                amenity;


            modalAmenities.appendChild(
                tag
            );

        }
    );


}





closeModal.addEventListener(
    "click",
    function() {

        propertyModal.classList.remove(
            "active"
        );

    }
);





propertyModal.addEventListener(
    "click",
    function(event) {


        if (
            event.target ===
            propertyModal
        ) {

            propertyModal.classList.remove(
                "active"
            );

        }

    }
);




viewMapButton.addEventListener(
    "click",
    async function() {


        if (
            !selectedProperty
        ) {

            return;

        }


        if (
            !workplaceCoordinates
        ) {

            alert(
                "Please search your workplace first."
            );

            return;

        }


        try {


            viewMapButton.disabled =
                true;


            viewMapButton.textContent =
                "Loading route...";


            await showRoute(
                selectedProperty
            );


            propertyModal.classList.remove(
                "active"
            );


        } catch (error) {


            console.error(
                error
            );


            alert(
                "Could not load the route."
            );


        } finally {


            viewMapButton.disabled =
                false;


            viewMapButton.textContent =
                "🗺️ View Route";

        }

    }
);




areaFilter.addEventListener(
    "change",
    function() {


        const selectedArea =
            areaFilter.value;


        let filteredProperties;


        if (
            selectedArea === "all"
        ) {

            filteredProperties =
                properties;

        } else {


            filteredProperties =
                properties.filter(
                    function(property) {

                        return (
                            property.area ===
                            selectedArea
                        );

                    }
                );

        }




        displayProperties(
            filteredProperties
        );




        displayPropertyMarkers(
            filteredProperties
        );

    }
);





favoriteButton.addEventListener(
    "click",
    function() {


        if (
            !selectedProperty
        ) {

            return;

        }


        selectedProperty.isFavorite =
            !selectedProperty.isFavorite;


        if (
            selectedProperty.isFavorite
        ) {

            favoriteButton.textContent =
                "♥ Favorited";

        } else {

            favoriteButton.textContent =
                "♡ Favorite";

        }

    }
);
displayProperties();

displayPropertyMarkers();