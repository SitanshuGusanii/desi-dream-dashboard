
import React from 'react';
import { IndianRupee, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="bg-india-orange p-2 rounded-full">
            <IndianRupee className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-india-navy">Rupa</span>
            <span className="text-india-orange">Wise</span>
            <span className="text-india-green ml-1">India</span>
          </h1>
        </div>
        
        <div className="text-center md:text-right">
          <h2 className="text-lg font-medium text-india-navy">
            India's Money Value & Salary Map
          </h2>
          <p className="text-sm text-gray-500 flex items-center justify-center md:justify-end gap-1">
            <MapPin className="h-4 w-4" />
            See how far your money goes in different cities
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
