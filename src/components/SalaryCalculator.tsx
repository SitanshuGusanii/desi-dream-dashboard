
import React, { useState } from 'react';
import { IndianRupee, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CityData, cities } from '@/data/cityData';
import { formatCurrency, calculateRelativePurchasingPower } from '@/lib/mapUtils';

interface SalaryCalculatorProps {
  selectedCity: CityData | null;
  onCompare: (city1: CityData, city2: CityData) => void;
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ selectedCity, onCompare }) => {
  const [salary, setSalary] = useState<string>('60000');
  const [compareCity, setCompareCity] = useState<string>('');
  
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    setSalary(value);
  };
  
  const handleCompareClick = () => {
    if (selectedCity && compareCity) {
      const city2 = cities.find(c => c.id === compareCity);
      if (city2) {
        onCompare(selectedCity, city2);
      }
    }
  };
  
  const renderPurchasingPowerBar = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    if (!city || !salary) return null;
    
    const salaryNum = parseInt(salary, 10) || 0;
    const purchasingPower = calculateRelativePurchasingPower(salaryNum, city.colIndex);
    
    // Calculate color based on purchasing power
    let barColor = 'bg-yellow-500';
    if (purchasingPower > 110) barColor = 'bg-green-500';
    else if (purchasingPower > 100) barColor = 'bg-green-400';
    else if (purchasingPower > 90) barColor = 'bg-yellow-400';
    else if (purchasingPower < 80) barColor = 'bg-red-500';
    else if (purchasingPower < 90) barColor = 'bg-red-400';
    
    return (
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Purchasing Power in {city.name}</span>
          <span className="font-medium">{purchasingPower.toFixed(1)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} rounded-full`} 
            style={{ width: `${Math.min(purchasingPower, 200)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {purchasingPower > 100 
            ? `Your salary goes ${(purchasingPower - 100).toFixed(1)}% further than the national average here`
            : `Your salary buys ${(100 - purchasingPower).toFixed(1)}% less than the national average here`}
        </p>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="h-5 w-5 text-india-orange" />
        <h2 className="text-lg font-semibold">Salary Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="salary" className="text-sm font-medium">
            Your Monthly Salary (INR)
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="salary"
              type="text"
              value={salary}
              onChange={handleSalaryChange}
              className="pl-10"
              placeholder="Enter your monthly salary"
            />
          </div>
          
          {selectedCity && renderPurchasingPowerBar(selectedCity.id)}
        </div>
        
        {selectedCity && (
          <div>
            <Label htmlFor="compareCity" className="text-sm font-medium">
              Compare with Another City
            </Label>
            <div className="mt-1">
              <select
                id="compareCity"
                value={compareCity}
                onChange={(e) => setCompareCity(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-india-orange focus:border-india-orange"
              >
                <option value="">Select a city to compare</option>
                {cities
                  .filter(city => city.id !== selectedCity.id)
                  .map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))
                }
              </select>
            </div>
            
            {compareCity && renderPurchasingPowerBar(compareCity)}
            
            {compareCity && (
              <Button 
                className="w-full mt-4 bg-india-orange hover:bg-india-orange/90 text-white"
                onClick={handleCompareClick}
              >
                Compare {selectedCity.name} vs. {cities.find(c => c.id === compareCity)?.name}
              </Button>
            )}
          </div>
        )}
        
        {!selectedCity && (
          <div className="text-sm text-gray-500 italic">
            Select a city on the map to calculate purchasing power and make comparisons
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryCalculator;
