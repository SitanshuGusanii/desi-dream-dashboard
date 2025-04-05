
import React, { useState, useEffect, useRef } from 'react';
import { cities, CityData } from '@/data/cityData';
import { getColorByColIndex, formatCurrency } from '@/lib/mapUtils';

interface MapProps {
  onCityClick: (city: CityData) => void;
}

const Map: React.FC<MapProps> = ({ onCityClick }) => {
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Normalized coordinates for SVG viewBox
  const normalizeCoordinates = (lat: number, lng: number): { x: number, y: number } => {
    // Map India's approximate bounding box to SVG coordinates
    // India's bounding box roughly: 8°N to 37°N, 68°E to 97°E
    const minLat = 6;
    const maxLat = 38;
    const minLng = 68;
    const maxLng = 98;
    
    // Invert Y axis because SVG Y grows downward
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - ((lat - minLat) / (maxLat - minLat))) * 100;
    
    return { x, y };
  };

  const handleCityMouseEnter = (e: React.MouseEvent, city: CityData) => {
    setHoveredCity(city);
    
    // Calculate tooltip position
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10
      });
    }
  };

  const handleCityMouseLeave = () => {
    setHoveredCity(null);
  };

  const handleCityMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current && hoveredCity) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10
      });
    }
  };

  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg shadow-md overflow-hidden border border-blue-100"
    >
      <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-md text-sm border border-gray-100">
        <div className="font-bold mb-2 text-india-navy">Cost of Living Index</div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#138808]"></span>
          <span>{"< 80 (Much lower)"}</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#5DC96A]"></span>
          <span>{"80-90 (Lower)"}</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#FFD700]"></span>
          <span>{"90-100 (Slightly lower)"}</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#FFA500]"></span>
          <span>{"100-110 (Slightly higher)"}</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#FF5733]"></span>
          <span>{"110-120 (Higher)"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#FF0000]"></span>
          <span>{"> 120 (Much higher)"}</span>
        </div>
      </div>
      
      {/* Simple India map SVG outline */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified India outline with improved styling */}
        <path
          d="M45,15 L55,15 L65,25 L75,30 L78,40 L75,50 L70,55 L75,60 L80,65 L75,75 L65,85 L55,90 L45,85 L35,80 L30,70 L25,60 L20,50 L25,40 L30,30 L40,20 L45,15"
          fill="#E8F4FA"
          stroke="#0066CC"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        
        {/* Cities with better styling and interactivity */}
        {cities.map((city) => {
          const { x, y } = normalizeCoordinates(city.latitude, city.longitude);
          return (
            <g key={`marker-${city.id}`} className="cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r={3}
                fill={getColorByColIndex(city.colIndex)}
                stroke="#FFF"
                strokeWidth="1"
                filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))"
                className="hover:ring-2 hover:ring-white hover:ring-opacity-70 hover:brightness-110"
                onClick={(e) => {
                  e.stopPropagation();
                  onCityClick(city);
                }}
                onMouseEnter={(e) => handleCityMouseEnter(e, city)}
                onMouseLeave={handleCityMouseLeave}
                onMouseMove={handleCityMouseMove}
              />
            </g>
          );
        })}
        
        {/* City labels with improved readability */}
        {cities.map((city) => {
          const { x, y } = normalizeCoordinates(city.latitude, city.longitude);
          return (
            <text
              key={`label-${city.id}`}
              x={x}
              y={y + 5}
              fontSize="2"
              fontWeight="600"
              textAnchor="middle"
              fill="#333"
              className="pointer-events-none select-none text-shadow"
            >
              {city.name}
            </text>
          );
        })}
      </svg>
      
      {/* Improved tooltip */}
      {hoveredCity && (
        <div
          ref={tooltipRef}
          className="absolute z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            opacity: 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: 'none'
          }}
        >
          <div className="font-bold text-india-navy border-b pb-1 mb-1">{hoveredCity.name}, {hoveredCity.state}</div>
          <div className="text-sm space-y-1">
            <div>Cost Index: <span className="font-semibold">{hoveredCity.colIndex}</span></div>
            <div>Avg. Salary: <span className="font-semibold">{formatCurrency(hoveredCity.averageSalary)}</span></div>
            <div>1BHK Rent: <span className="font-semibold">{formatCurrency(hoveredCity.rent.oneBHK)}</span></div>
          </div>
          <div className="text-xs text-gray-500 mt-2 italic">Click for more details</div>
        </div>
      )}
    </div>
  );
};

export default Map;
