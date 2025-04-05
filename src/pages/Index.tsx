
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
      description: `Cost Index: ${city.colIndex} | Avg. Salary: ₹${city.averageSalary.toLocaleString('en-IN')}`,
      duration: 3000,
    });
  };

  const handleCloseCityPanel = () => {
    setShowCityPanel(false);
  };

  const handleCompareButtonClick = (city: CityData) => {
    if (selectedCity === city) {
      toast({
        title: "Can't compare same city",
        description: "Please pick a different city to compare",
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
              <h2 className="text-lg font-semibold mb-4">India Money Value Map</h2>
              <p className="text-sm text-gray-600 mb-4">
                See how much things cost in different Indian cities. Hover over cities for basic info,
                click for details, and use the salary tool to see how far your money goes.
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
                <li>Click any city on the map to see costs</li>
                <li>Enter your salary to see its buying power</li>
                <li>Compare two cities side-by-side</li>
                <li>See how much salary you'd need in a different city</li>
              </ul>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">About the Data</h2>
              <p className="text-sm text-gray-600">
                Cost data shown is for example only. 
                Cost Index values compare to the national average (100).
                Data is from market surveys and reports.
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
          <p>RupaWise India &copy; 2025 | India's Money Value Comparison Tool</p>
          <p className="mt-1">Data is for example only and may not match real costs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
