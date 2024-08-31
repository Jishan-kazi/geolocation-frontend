import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';

const GeolocationInfo = () => {
  const [geoInfo, setGeoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ipAddress, setIpAddress] = useState('');
  const [isValidIp, setIsValidIp] = useState(true);


  const validateIpAddress = (ip) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleIpChange = useCallback(
    _.debounce((value) => {
      setIpAddress(value);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    handleIpChange(value);
  };

  const handleSubmit = () => {
    if (validateIpAddress(ipAddress)) {
      setIsValidIp(true);
      fetchGeolocationInfo(ipAddress);
    } else {
      setIsValidIp(false);
    }
  };


  const fetchGeolocationInfo = useCallback(async (enteredIp) => {
    try {
      let url = 'http://127.0.0.1:8000/api/geolocation-info';
      if (enteredIp) {
        url += '?ip_address=' + enteredIp;
        setLoading(true);
      }
      const response = await axios.get(url);
      setGeoInfo(response.data);
    } catch (error) {
      setError('Failed to fetch geolocation data.');
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchGeolocationInfo();
  }, [fetchGeolocationInfo]);

  let content = <>
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

      

  </>

  if (loading) {
    content = <div className="text-center mt-10">Loading your geolocation information...</div>;
  }else if (error) {
    content = <div className="text-center text-red-500 mt-10">{error}</div>;
  }
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            onChange={handleInputChange}
            // value={ipAddress}
            placeholder="Enter IP Address"
            className={`px-4 py-2 border ${isValidIp ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          <button 
            disabled={loading}
            onClick={handleSubmit} 
            className="ml-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Submit
          </button>
        </div>
        {!isValidIp && (
          <p className="text-red-500">Invalid IP Address</p>
        )}
      </div>
      {content}
    </div>
  );
};

export default GeolocationInfo;
