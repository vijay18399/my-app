import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
function WeatherForm({getWeatherData}){
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loader, toggleLoader] = useState(false);
    function setLatitudeAndLongitude() {
        toggleLoader(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (data) {
                setLatitude(data.coords.latitude);
                setLongitude(data.coords.longitude);
                toggleLoader(false)
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex from-teal-500 items-center justify-center">
            <div onClick={() => setLatitudeAndLongitude()} className="flex items-center justify-center text-teal-500">
                <span  className="p-2 rounded-lg transition duration-300 focus:outline-none block text-center cursor-pointer">Fetch My Location  </span>
                { loader ?   <FiLoader className="animate-spin from-teal-500 text-2xl" /> :  <MdMyLocation className="from-teal-400 text-2xl" />   }
            </div>
            
        </div>
              <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Add Latitude"
            className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none"
        />
        <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Add Longitude"
            className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none"
        />
        <button  disabled={!(latitude && longitude)} onClick={() => getWeatherData(latitude,longitude)} className="bg-teal-500 text-white p-2 rounded-lg transition duration-300 focus:outline-none w-full  disabled:bg-slate-600 disabled:opacity-75 disabled:cursor-not-allowed">Get Weather Data</button>
    </div>
</div>
}
export default WeatherForm;