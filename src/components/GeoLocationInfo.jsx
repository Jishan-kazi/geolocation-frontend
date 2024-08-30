import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeolocationInfo = () => {
  const [geoInfo, setGeoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeolocationInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/geolocation-info');
        setGeoInfo(response.data);
      } catch (error) {
        setError('Failed to fetch geolocation data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGeolocationInfo();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading your geolocation information...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Geolocation Information</h2>
      {geoInfo ? (
        <div>
          <p><strong>Country:</strong> {geoInfo.country}</p>
          <p><strong>Region:</strong> {geoInfo.region}</p>
          <p><strong>City:</strong> {geoInfo.city}</p>
          <p><strong>Latitude:</strong> {geoInfo.latitude}</p>
          <p><strong>Longitude:</strong> {geoInfo.longitude}</p>
        </div>
      ) : (
        <p>No geolocation data available.</p>
      )}
    </div>
  );
};

export default GeolocationInfo;
