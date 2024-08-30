import { useState, useEffect } from 'react';
import axios from 'axios';

const IpAddress = () => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIp(response.data.ip);
      } catch (error) {
        setError('Failed to fetch IP address.');
      } finally {
        setLoading(false);
      }
    };

    fetchIpAddress();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading your ip address...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your IP Address</h2>
      <p className="text-lg">Your IP address is: <strong>{ip}</strong></p>
    </div>
  );
};

export default IpAddress;
