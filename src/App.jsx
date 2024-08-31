import { useState } from 'react';
import GeoLocationInfo from './components/GeoLocationInfo.jsx';
import IpAddress from './components/IpAddress.jsx';
import axios from 'axios';

const App = () => {
  const [fetchIp, setFetchIp] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      
      <div className="mb-8">
        <button 
          onClick={() => setFetchIp(true)} 
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Get Your IP Address
        </button>
      </div>

      <div className="mb-8">
        {fetchIp && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <IpAddress />
          </div>
        )}
      </div>

      

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <GeoLocationInfo />
      </div>
    </div>
  );
};

export default App;
