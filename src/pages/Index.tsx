
import React, { useState } from 'react';
import Header from '@/components/Header';
import Map from '@/components/Map';
import CityPanel from '@/components/CityPanel';
import ComparisonPanel from '@/components/ComparisonPanel';
import SalaryCalculator from '@/components/SalaryCalculator';
import { CityData } from '@/data/cityData';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [compareCity, setCompareCity] = useState<CityData | null>(null);
  const [showCityPanel, setShowCityPanel] = useState(false);
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);
  const [salary, setSalary] = useState(60000);

  const handleCityClick = (city: CityData) => {
    setSelectedCity(city);
    setShowCityPanel(true);
    
    toast({
      title: `${city.name}, ${city.state}`,
      description: `COL Index: ${city.colIndex} | Avg. Salary: ₹${city.averageSalary.toLocaleString('en-IN')}`,
      duration: 3000,
    });
  };

  const handleCloseCityPanel = () => {
    setShowCityPanel(false);
  };

  const handleCompareButtonClick = (city: CityData) => {
    if (selectedCity === city) {
      toast({
        title: "Cannot compare same city",
        description: "Please select a different city to compare",
        variant: "destructive",
      });
      return;
    }
    
    setCompareCity(city);
    setShowCityPanel(false);
    setShowComparisonPanel(true);
  };

  const handleInitiateComparison = (city1: CityData, city2: CityData) => {
    setSelectedCity(city1);
    setCompareCity(city2);
    setShowComparisonPanel(true);
  };

  const handleCloseComparisonPanel = () => {
    setShowComparisonPanel(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">Interactive India Cost of Living Map</h2>
              <p className="text-sm text-gray-600 mb-4">
                Explore the cost of living across major Indian cities. Hover over cities to see basic info,
                click for detailed costs, and use the salary calculator to see how far your income will go.
              </p>
              <div className="h-[500px]">
                <Map onCityClick={handleCityClick} />
              </div>
            </div>
          </div>
          
          <div>
            <SalaryCalculator 
              selectedCity={selectedCity} 
              onCompare={handleInitiateComparison}
            />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Click on any city marker to view detailed cost breakdown</li>
                <li>Enter your salary to see your purchasing power in that city</li>
                <li>Compare two cities side-by-side to evaluate cost differences</li>
                <li>See how much salary you'd need in one city to maintain your standard of living from another</li>
              </ul>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">About the Data</h2>
              <p className="text-sm text-gray-600">
                The cost of living data shown is approximate and for demonstration purposes. 
                Cost of Living Index values are relative to the national average (100).
                Data sources include market surveys, government statistics, and economic reports.
                Last updated: April 2025.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* City Panel */}
      {selectedCity && (
        <CityPanel
          city={selectedCity}
          isOpen={showCityPanel}
          onClose={handleCloseCityPanel}
          onCompare={handleCompareButtonClick}
        />
      )}
      
      {/* Comparison Panel */}
      {selectedCity && compareCity && (
        <ComparisonPanel
          city1={selectedCity}
          city2={compareCity}
          isOpen={showComparisonPanel}
          onClose={handleCloseComparisonPanel}
          baseSalary={salary}
        />
      )}
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>DesiCost Explorer &copy; 2025 | India's Premier Cost of Living Comparison Tool</p>
          <p className="mt-1">Data is for demonstration purposes only and may not reflect actual costs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
