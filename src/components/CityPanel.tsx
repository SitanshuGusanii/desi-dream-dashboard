
import React from 'react';
import { X, Home, ShoppingCart, Truck, Utensils, Droplets, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityData, nationalAverages } from '@/data/cityData';
import { formatCurrency, calculatePercentageDiff, formatPercentage, getDiffEmoji } from '@/lib/mapUtils';

interface CityPanelProps {
  city: CityData;
  isOpen: boolean;
  onClose: () => void;
  onCompare: (city: CityData) => void;
}

const CityPanel: React.FC<CityPanelProps> = ({ city, isOpen, onClose, onCompare }) => {
  if (!isOpen) return null;

  const renderComparisonItem = (cityValue: number, avgValue: number, label: string, lowerIsBetter: boolean = true) => {
    const diff = calculatePercentageDiff(cityValue, avgValue);
    const isBetter = lowerIsBetter ? diff < 0 : diff > 0;
    
    return (
      <div className="flex justify-between items-center border-b border-gray-100 py-2">
        <span>{label}</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{formatCurrency(cityValue)}</span>
          <span className={`text-xs ${isBetter ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(diff)} {getDiffEmoji(diff)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 animate-slide-in-right overflow-y-auto`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-india-navy">{city.name}, {city.state}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Cost of Living Index</span>
            <span className="font-bold text-xl">{city.colIndex}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Average Monthly Salary</span>
            <span className="font-bold">{formatCurrency(city.averageSalary)}</span>
          </div>
          <Button 
            className="w-full mt-4 bg-india-orange hover:bg-india-orange/90 text-white"
            onClick={() => onCompare(city)}
          >
            Compare with Another City
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Home className="h-5 w-5 text-india-orange" />
              <h3 className="font-semibold text-lg">Housing (Monthly Rent)</h3>
            </div>
            {renderComparisonItem(city.rent.oneBHK, nationalAverages.rent.oneBHK, "1 BHK Apartment")}
            {renderComparisonItem(city.rent.twoBHK, nationalAverages.rent.twoBHK, "2 BHK Apartment")}
            {renderComparisonItem(city.rent.threeBHK, nationalAverages.rent.threeBHK, "3 BHK Apartment")}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <ShoppingCart className="h-5 w-5 text-india-green" />
              <h3 className="font-semibold text-lg">Groceries</h3>
            </div>
            {renderComparisonItem(city.groceries.milkLiter, nationalAverages.groceries.milkLiter, "Milk (1 liter)")}
            {renderComparisonItem(city.groceries.riceKg, nationalAverages.groceries.riceKg, "Rice (1 kg)")}
            {renderComparisonItem(city.groceries.eggsDozen, nationalAverages.groceries.eggsDozen, "Eggs (12)")}
            {renderComparisonItem(city.groceries.breadLoaf, nationalAverages.groceries.breadLoaf, "Bread (loaf)")}
            {renderComparisonItem(city.groceries.chickenKg, nationalAverages.groceries.chickenKg, "Chicken (1 kg)")}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-5 w-5 text-india-blue" />
              <h3 className="font-semibold text-lg">Utilities</h3>
            </div>
            {renderComparisonItem(city.utilities.monthly, nationalAverages.utilities.monthly, "Basic (Electricity, Water, etc.)")}
            {renderComparisonItem(city.utilities.internet, nationalAverages.utilities.internet, "Internet (Broadband)")}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="h-5 w-5 text-india-navy" />
              <h3 className="font-semibold text-lg">Transportation</h3>
            </div>
            {renderComparisonItem(city.transport.busTicket, nationalAverages.transport.busTicket, "Bus Ticket (one-way)")}
            {renderComparisonItem(city.transport.monthlyPass, nationalAverages.transport.monthlyPass, "Monthly Pass")}
            {renderComparisonItem(city.transport.taxiKm, nationalAverages.transport.taxiKm, "Taxi (per km)")}
            {renderComparisonItem(city.transport.petrolLiter, nationalAverages.transport.petrolLiter, "Petrol (1 liter)")}
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Utensils className="h-5 w-5 text-india-saffron" />
              <h3 className="font-semibold text-lg">Restaurants</h3>
            </div>
            {renderComparisonItem(city.restaurant.inexpensiveMeal, nationalAverages.restaurant.inexpensiveMeal, "Inexpensive Meal")}
            {renderComparisonItem(city.restaurant.midRangeMeal, nationalAverages.restaurant.midRangeMeal, "Mid-range Meal (2 people)")}
            {renderComparisonItem(city.restaurant.cappuccino, nationalAverages.restaurant.cappuccino, "Cappuccino")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPanel;
