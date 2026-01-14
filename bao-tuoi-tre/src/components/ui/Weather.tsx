import { useState, useEffect, useRef } from 'react';
import { 
  CloudSun, 
  ChevronDown, 
  Search, 
  X,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog
} from 'lucide-react';
import axios from 'axios';

const PROVINCES = [
  { name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
  { name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
  { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881 },
  { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 },
  { name: 'An Giang', lat: 10.3759, lon: 105.4185 },
  { name: 'Bà Rịa - Vũng Tàu', lat: 10.4114, lon: 107.1362 },
  { name: 'Bạc Liêu', lat: 9.2941, lon: 105.7278 },
  { name: 'Bắc Giang', lat: 21.2731, lon: 106.1946 },
  { name: 'Bắc Ninh', lat: 21.1861, lon: 106.0763 },
  { name: 'Bến Tre', lat: 10.2432, lon: 106.3757 },
  { name: 'Bình Dương', lat: 11.1601, lon: 106.6718 },
  { name: 'Bình Định', lat: 13.7820, lon: 109.2192 },
  { name: 'Bình Phước', lat: 11.7516, lon: 106.9103 },
  { name: 'Bình Thuận', lat: 11.0872, lon: 108.0673 },
  { name: 'Cà Mau', lat: 9.1769, lon: 105.1524 },
  { name: 'Cao Bằng', lat: 22.6732, lon: 106.2625 },
  { name: 'Đắk Lắk', lat: 12.6669, lon: 108.0378 },
  { name: 'Đồng Nai', lat: 11.0425, lon: 107.1843 },
  { name: 'Huế', lat: 16.4637, lon: 107.5909 },
  { name: 'Khánh Hòa', lat: 12.2451, lon: 109.1943 },
  { name: 'Lâm Đồng (Đà Lạt)', lat: 11.9404, lon: 108.4583 },
  { name: 'Nghệ An', lat: 19.3333, lon: 104.9085 },
  { name: 'Quảng Ninh', lat: 21.0069, lon: 107.2925 },
];

function Weather() {
  const [location, setLocation] = useState(PROVINCES[0]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFormattedDate = () => {
    const date = new Date();
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayName = days[date.getDay()];
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${dayName}, ngày ${d}-${m}-${y}`;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        setWeatherData({
            ...res.data.current_weather,
            max: res.data.daily.temperature_2m_max[0],
            min: res.data.daily.temperature_2m_min[0]
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getWeatherIcon = (code: number, isDay = true) => {
    if (code === 0)
      return <Sun className="w-6 h-6 text-yellow-500" />;
    if (code >= 1 && code <= 3)
      return (
        isDay
          ? <CloudSun className="w-6 h-6 text-gray-500" />
          : <Cloud className="w-6 h-6 text-gray-400" />
      );
    if (code === 45 || code === 48)
      return <CloudFog className="w-6 h-6 text-gray-400" />;
    if (
      (code >= 51 && code <= 55) ||
      (code >= 61 && code <= 65) ||
      (code >= 80 && code <= 82)
    )
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    if (
      (code >= 56 && code <= 57) ||
      (code >= 66 && code <= 67) ||
      (code >= 71 && code <= 77) ||
      (code >= 85 && code <= 86)
    )
      return <Snowflake className="w-6 h-6 text-cyan-300" />;
    if (code >= 95)
      return <CloudLightning className="w-6 h-6 text-purple-500" />;

    return <Cloud className="w-6 h-6 text-gray-400" />;
  };

  const filteredProvinces = PROVINCES.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border-b border-gray-200 pb-4 relative" ref={dropdownRef}>
      <div className="text-[13px] text-gray-800 font-medium">
        {getFormattedDate()}
      </div>
      
      <div className="flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center text-[13px] text-gray-800 font-medium">
            {location.name}
            <ChevronDown className="w-4 h-4" />
        </div>
        <div className="text-[13px] text-gray-500">
            {loading ? '...' : (
                weatherData ? `${ Math.round(weatherData.min)}° - ${Math.round(weatherData.max)}°C` : '--° - --°C'
            )}
        </div>
        <div className="ml-1">
          {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : (
              weatherData && getWeatherIcon(weatherData.weathercode, weatherData.is_day === 1)
          )}
        </div>
      </div>
     
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-[-10px] w-full bg-white border border-gray-200 shadow-lg rounded z-50 overflow-hidden">
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Nhập tên tỉnh thành..." 
                    className="w-full text-sm bg-transparent outline-none text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
                {searchTerm && (
                    <button onClick={() => setSearchTerm('')}>
                        <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {filteredProvinces.length > 0 ? (
                    filteredProvinces.map((prov, idx) => (
                        <div 
                            key={idx}
                            onClick={() => {
                                setLocation(prov);
                                setIsOpen(false);
                                setSearchTerm('');
                            }}
                            className="px-3 py-2 text-sm cursor-pointer">
                            {prov.name}
                        </div>
                    ))
                ) : (
                    <div className="px-3 py-4 text-center text-xs text-gray-500">
                        Không tìm thấy
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  )
}

export default Weather