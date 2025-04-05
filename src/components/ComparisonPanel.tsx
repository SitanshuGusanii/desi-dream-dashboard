
import React from 'react';
import { X, Home, ShoppingCart, Truck, Utensils, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityData } from '@/data/cityData';
import { formatCurrency, compareItems, calculateEquivalentSalary } from '@/lib/mapUtils';

interface ComparisonPanelProps {
  city1: CityData;
  city2: CityData;
  isOpen: boolean;
  onClose: () => void;
  baseSalary: number;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  city1,
  city2,
  isOpen,
  onClose,
  baseSalary,
}) => {
  if (!isOpen) return null;

  // Calculate equivalent salary needed in city2 to maintain same standard of living
  const equivalentSalary = calculateEquivalentSalary(
    baseSalary,
    city1.colIndex,
    city2.colIndex
  );

  // Calculate the percentage difference
  const salaryDiff = ((equivalentSalary - baseSalary) / baseSalary) * 100;
  const salaryDiffStr = salaryDiff > 0 
    ? `+${salaryDiff.toFixed(1)}%` 
    : `${salaryDiff.toFixed(1)}%`;

  const renderComparisonRow = (
    label: string,
    value1: number,
    value2: number,
    lowerIsBetter: boolean = true
  ) => {
    const comparison = compareItems(value2, value1, lowerIsBetter);
    
    return (
      <tr className="border-b border-gray-100">
        <td className="py-2 text-sm">{label}</td>
        <td className="py-2 text-sm font-medium text-right">{formatCurrency(value1)}</td>
        <td className="py-2 text-sm font-medium text-right">{formatCurrency(value2)}</td>
        <td className={`py-2 text-sm font-medium text-right ${comparison.isBetter ? 'text-green-600' : 'text-red-600'}`}>
          {comparison.percentage} {comparison.emoji}
        </td>
      </tr>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-4 sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-india-navy">City Comparison</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <h3 className="font-bold text-lg">{city1.name}</h3>
              <p className="text-sm text-gray-500">{city1.state}</p>
              <p className="text-sm mt-1">COL Index: <span className="font-semibold">{city1.colIndex}</span></p>
            </div>
            
            <ArrowRight className="hidden md:block h-6 w-6 text-gray-400" />
            
            <div className="text-center">
              <h3 className="font-bold text-lg">{city2.name}</h3>
              <p className="text-sm text-gray-500">{city2.state}</p>
              <p className="text-sm mt-1">COL Index: <span className="font-semibold">{city2.colIndex}</span></p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Equivalent Salary Calculation</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">{city1.name}</p>
                <p className="font-bold text-lg">{formatCurrency(baseSalary)}</p>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">{city2.name}</p>
                <p className="font-bold text-lg">{formatCurrency(equivalentSalary)}</p>
                <p className={`text-xs ${salaryDiff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {salaryDiffStr} {salaryDiff > 0 ? '(need more)' : '(need less)'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              To maintain the same standard of living as {formatCurrency(baseSalary)} in {city1.name}, 
              you would need approximately {formatCurrency(equivalentSalary)} in {city2.name}.
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Home className="h-5 w-5 text-india-orange" />
                <h3 className="font-semibold">Housing (Monthly Rent)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-2 text-sm font-medium">Item</th>
                      <th className="py-2 text-sm font-medium text-right">{city1.name}</th>
                      <th className="py-2 text-sm font-medium text-right">{city2.name}</th>
                      <th className="py-2 text-sm font-medium text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow("1 BHK Apartment", city1.rent.oneBHK, city2.rent.oneBHK)}
                    {renderComparisonRow("2 BHK Apartment", city1.rent.twoBHK, city2.rent.twoBHK)}
                    {renderComparisonRow("3 BHK Apartment", city1.rent.threeBHK, city2.rent.threeBHK)}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-india-green" />
                <h3 className="font-semibold">Groceries</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-2 text-sm font-medium">Item</th>
                      <th className="py-2 text-sm font-medium text-right">{city1.name}</th>
                      <th className="py-2 text-sm font-medium text-right">{city2.name}</th>
                      <th className="py-2 text-sm font-medium text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow("Milk (1 liter)", city1.groceries.milkLiter, city2.groceries.milkLiter)}
                    {renderComparisonRow("Rice (1 kg)", city1.groceries.riceKg, city2.groceries.riceKg)}
                    {renderComparisonRow("Eggs (12)", city1.groceries.eggsDozen, city2.groceries.eggsDozen)}
                    {renderComparisonRow("Bread (loaf)", city1.groceries.breadLoaf, city2.groceries.breadLoaf)}
                    {renderComparisonRow("Chicken (1 kg)", city1.groceries.chickenKg, city2.groceries.chickenKg)}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="h-5 w-5 text-india-blue" />
                <h3 className="font-semibold">Utilities</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-2 text-sm font-medium">Item</th>
                      <th className="py-2 text-sm font-medium text-right">{city1.name}</th>
                      <th className="py-2 text-sm font-medium text-right">{city2.name}</th>
                      <th className="py-2 text-sm font-medium text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow("Basic (Electricity, Water, etc.)", city1.utilities.monthly, city2.utilities.monthly)}
                    {renderComparisonRow("Internet (Broadband)", city1.utilities.internet, city2.utilities.internet)}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-5 w-5 text-india-navy" />
                <h3 className="font-semibold">Transportation</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-2 text-sm font-medium">Item</th>
                      <th className="py-2 text-sm font-medium text-right">{city1.name}</th>
                      <th className="py-2 text-sm font-medium text-right">{city2.name}</th>
                      <th className="py-2 text-sm font-medium text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow("Bus Ticket (one-way)", city1.transport.busTicket, city2.transport.busTicket)}
                    {renderComparisonRow("Monthly Pass", city1.transport.monthlyPass, city2.transport.monthlyPass)}
                    {renderComparisonRow("Taxi (per km)", city1.transport.taxiKm, city2.transport.taxiKm)}
                    {renderComparisonRow("Petrol (1 liter)", city1.transport.petrolLiter, city2.transport.petrolLiter)}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Utensils className="h-5 w-5 text-india-saffron" />
                <h3 className="font-semibold">Restaurants</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-50">
                      <th className="py-2 text-sm font-medium">Item</th>
                      <th className="py-2 text-sm font-medium text-right">{city1.name}</th>
                      <th className="py-2 text-sm font-medium text-right">{city2.name}</th>
                      <th className="py-2 text-sm font-medium text-right">Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow("Inexpensive Meal", city1.restaurant.inexpensiveMeal, city2.restaurant.inexpensiveMeal)}
                    {renderComparisonRow("Mid-range Meal (2 people)", city1.restaurant.midRangeMeal, city2.restaurant.midRangeMeal)}
                    {renderComparisonRow("Cappuccino", city1.restaurant.cappuccino, city2.restaurant.cappuccino)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
