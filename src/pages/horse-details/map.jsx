

import React, { useState, useEffect } from 'react';
import { TfiLocationPin } from 'react-icons/tfi';
import { HStack } from '@chakra-ui/react'

const MapComponent = ({ location }) => {
    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcm9pZGFtYW4iLCJhIjoiY2t1MjZ4bThoNDN2ajJvbXA0amc0eWN3NSJ9.vo7c-t6sXINoS7Cs7qTwVA';

        const initializeMap = () => {
            // Check if location is defined and has valid latitude and longitude
            if (!location || !location.latitude || !location.longitude) {
                console.error('Invalid location data:', location);
                return;
            }

            const lat = parseFloat(location.latitude);
            const lng = parseFloat(location.longitude);

            if (isNaN(lat) || isNaN(lng)) {
                console.error('Invalid latitude or longitude:', location.latitude, location.longitude);
                return;
            }

            const initialViewport = {
                center: [lng, lat], // Use the provided latitude and longitude
                zoom: 18,
            };

            const mapInstance = new mapboxgl.Map({
                container: 'map', // ID of the div where the map will be rendered
                style: 'mapbox://styles/mapbox/streets-v11',
                center: initialViewport.center,
                zoom: initialViewport.zoom,
            });

            // Add marker for the current location
            const marker = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(mapInstance);

            setMap(mapInstance);
            setCurrentLocation({
                latitude: lat.toFixed(4),
                longitude: lng.toFixed(4),
                city: '', // You can fetch the city name here if needed
            });

            // Fetch address details using Mapbox Geocoding API
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        const fullAddress = data.features[0].place_name;
                        setAddress(fullAddress);
                    }
                })
                .catch(error => console.error('Error fetching address:', error));
        };

        if (location) initializeMap();

        return () => {
            if (map) map.remove();
        };
    }, [location]);

    return (

        <div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <HStack as={'span'} className='border' rounded={'4px'} p={1} mt={2} fontSize={{ base: "16px", lg: "20px" }} fontWeight={'300'}>
                <TfiLocationPin fontSize={'20'} />  <p>{address}</p>
            </HStack>
        </div>
    );
};

export default MapComponent;
