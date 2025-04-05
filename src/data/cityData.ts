
export interface CityData {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  colIndex: number; // Cost of Living Index (100 = national average)
  averageSalary: number; // Monthly in INR
  rent: {
    oneBHK: number; // Monthly rent for 1BHK in INR
    twoBHK: number; // Monthly rent for 2BHK in INR
    threeBHK: number; // Monthly rent for 3BHK in INR
  };
  groceries: {
    milkLiter: number; // in INR
    riceKg: number; // in INR
    eggsDozen: number; // in INR
    breadLoaf: number; // in INR
    chickenKg: number; // in INR
  };
  utilities: {
    monthly: number; // Monthly utilities in INR (electricity, water, etc.)
    internet: number; // Monthly broadband internet in INR
  };
  transport: {
    busTicket: number; // Single bus ticket in INR
    monthlyPass: number; // Monthly public transport pass in INR
    taxiKm: number; // Taxi 1km in INR
    petrolLiter: number; // Petrol 1 liter in INR
  };
  restaurant: {
    inexpensiveMeal: number; // Inexpensive meal in INR
    midRangeMeal: number; // Mid-range restaurant three-course meal for 2 in INR
    cappuccino: number; // Cappuccino in INR
  };
}

// Data is approximate and for demonstration purposes
export const cities: CityData[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    latitude: 19.076,
    longitude: 72.8777,
    colIndex: 120, // 20% higher than national average
    averageSalary: 65000,
    rent: {
      oneBHK: 25000,
      twoBHK: 45000,
      threeBHK: 70000
    },
    groceries: {
      milkLiter: 60,
      riceKg: 70,
      eggsDozen: 90,
      breadLoaf: 45,
      chickenKg: 250
    },
    utilities: {
      monthly: 3500,
      internet: 1200
    },
    transport: {
      busTicket: 15,
      monthlyPass: 1500,
      taxiKm: 25,
      petrolLiter: 108
    },
    restaurant: {
      inexpensiveMeal: 300,
      midRangeMeal: 2000,
      cappuccino: 150
    }
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi",
    latitude: 28.7041,
    longitude: 77.1025,
    colIndex: 110, // 10% higher than national average
    averageSalary: 60000,
    rent: {
      oneBHK: 18000,
      twoBHK: 35000,
      threeBHK: 60000
    },
    groceries: {
      milkLiter: 58,
      riceKg: 65,
      eggsDozen: 85,
      breadLoaf: 40,
      chickenKg: 240
    },
    utilities: {
      monthly: 3200,
      internet: 1100
    },
    transport: {
      busTicket: 10,
      monthlyPass: 1200,
      taxiKm: 23,
      petrolLiter: 105
    },
    restaurant: {
      inexpensiveMeal: 250,
      midRangeMeal: 1800,
      cappuccino: 140
    }
  },
  {
    id: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    colIndex: 115, // 15% higher than national average
    averageSalary: 70000,
    rent: {
      oneBHK: 20000,
      twoBHK: 35000,
      threeBHK: 55000
    },
    groceries: {
      milkLiter: 55,
      riceKg: 60,
      eggsDozen: 80,
      breadLoaf: 40,
      chickenKg: 230
    },
    utilities: {
      monthly: 3000,
      internet: 1000
    },
    transport: {
      busTicket: 15,
      monthlyPass: 1300,
      taxiKm: 22,
      petrolLiter: 103
    },
    restaurant: {
      inexpensiveMeal: 280,
      midRangeMeal: 1800,
      cappuccino: 160
    }
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    latitude: 17.385,
    longitude: 78.4867,
    colIndex: 95, // 5% lower than national average
    averageSalary: 60000,
    rent: {
      oneBHK: 15000,
      twoBHK: 25000,
      threeBHK: 40000
    },
    groceries: {
      milkLiter: 52,
      riceKg: 55,
      eggsDozen: 75,
      breadLoaf: 35,
      chickenKg: 220
    },
    utilities: {
      monthly: 2800,
      internet: 950
    },
    transport: {
      busTicket: 12,
      monthlyPass: 1100,
      taxiKm: 20,
      petrolLiter: 102
    },
    restaurant: {
      inexpensiveMeal: 220,
      midRangeMeal: 1500,
      cappuccino: 130
    }
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    latitude: 13.0827,
    longitude: 80.2707,
    colIndex: 90, // 10% lower than national average
    averageSalary: 55000,
    rent: {
      oneBHK: 14000,
      twoBHK: 25000,
      threeBHK: 40000
    },
    groceries: {
      milkLiter: 50,
      riceKg: 60,
      eggsDozen: 70,
      breadLoaf: 35,
      chickenKg: 210
    },
    utilities: {
      monthly: 2500,
      internet: 900
    },
    transport: {
      busTicket: 10,
      monthlyPass: 1000,
      taxiKm: 18,
      petrolLiter: 101
    },
    restaurant: {
      inexpensiveMeal: 200,
      midRangeMeal: 1400,
      cappuccino: 120
    }
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    latitude: 22.5726,
    longitude: 88.3639,
    colIndex: 80, // 20% lower than national average
    averageSalary: 45000,
    rent: {
      oneBHK: 12000,
      twoBHK: 20000,
      threeBHK: 35000
    },
    groceries: {
      milkLiter: 48,
      riceKg: 55,
      eggsDozen: 65,
      breadLoaf: 30,
      chickenKg: 200
    },
    utilities: {
      monthly: 2300,
      internet: 850
    },
    transport: {
      busTicket: 8,
      monthlyPass: 800,
      taxiKm: 15,
      petrolLiter: 100
    },
    restaurant: {
      inexpensiveMeal: 180,
      midRangeMeal: 1200,
      cappuccino: 100
    }
  },
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    colIndex: 105, // 5% higher than national average
    averageSalary: 55000,
    rent: {
      oneBHK: 18000,
      twoBHK: 30000,
      threeBHK: 45000
    },
    groceries: {
      milkLiter: 55,
      riceKg: 65,
      eggsDozen: 85,
      breadLoaf: 40,
      chickenKg: 240
    },
    utilities: {
      monthly: 2800,
      internet: 1000
    },
    transport: {
      busTicket: 12,
      monthlyPass: 1100,
      taxiKm: 20,
      petrolLiter: 102
    },
    restaurant: {
      inexpensiveMeal: 250,
      midRangeMeal: 1600,
      cappuccino: 130
    }
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    latitude: 23.0225,
    longitude: 72.5714,
    colIndex: 85, // 15% lower than national average
    averageSalary: 50000,
    rent: {
      oneBHK: 13000,
      twoBHK: 22000,
      threeBHK: 35000
    },
    groceries: {
      milkLiter: 50,
      riceKg: 58,
      eggsDozen: 75,
      breadLoaf: 35,
      chickenKg: 220
    },
    utilities: {
      monthly: 2500,
      internet: 900
    },
    transport: {
      busTicket: 10,
      monthlyPass: 900,
      taxiKm: 18,
      petrolLiter: 100
    },
    restaurant: {
      inexpensiveMeal: 200,
      midRangeMeal: 1400,
      cappuccino: 120
    }
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    latitude: 26.9124,
    longitude: 75.7873,
    colIndex: 75, // 25% lower than national average
    averageSalary: 45000,
    rent: {
      oneBHK: 10000,
      twoBHK: 18000,
      threeBHK: 30000
    },
    groceries: {
      milkLiter: 45,
      riceKg: 50,
      eggsDozen: 65,
      breadLoaf: 30,
      chickenKg: 200
    },
    utilities: {
      monthly: 2200,
      internet: 800
    },
    transport: {
      busTicket: 8,
      monthlyPass: 750,
      taxiKm: 15,
      petrolLiter: 100
    },
    restaurant: {
      inexpensiveMeal: 170,
      midRangeMeal: 1100,
      cappuccino: 100
    }
  },
  {
    id: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    latitude: 26.8467,
    longitude: 80.9462,
    colIndex: 70, // 30% lower than national average
    averageSalary: 40000,
    rent: {
      oneBHK: 9000,
      twoBHK: 15000,
      threeBHK: 25000
    },
    groceries: {
      milkLiter: 45,
      riceKg: 48,
      eggsDozen: 60,
      breadLoaf: 28,
      chickenKg: 190
    },
    utilities: {
      monthly: 2000,
      internet: 800
    },
    transport: {
      busTicket: 7,
      monthlyPass: 700,
      taxiKm: 14,
      petrolLiter: 99
    },
    restaurant: {
      inexpensiveMeal: 150,
      midRangeMeal: 1000,
      cappuccino: 90
    }
  }
];

// Calculate the national average for various metrics
export const nationalAverages = {
  colIndex: 100, // By definition
  averageSalary: cities.reduce((sum, city) => sum + city.averageSalary, 0) / cities.length,
  rent: {
    oneBHK: cities.reduce((sum, city) => sum + city.rent.oneBHK, 0) / cities.length,
    twoBHK: cities.reduce((sum, city) => sum + city.rent.twoBHK, 0) / cities.length,
    threeBHK: cities.reduce((sum, city) => sum + city.rent.threeBHK, 0) / cities.length
  },
  groceries: {
    milkLiter: cities.reduce((sum, city) => sum + city.groceries.milkLiter, 0) / cities.length,
    riceKg: cities.reduce((sum, city) => sum + city.groceries.riceKg, 0) / cities.length,
    eggsDozen: cities.reduce((sum, city) => sum + city.groceries.eggsDozen, 0) / cities.length,
    breadLoaf: cities.reduce((sum, city) => sum + city.groceries.breadLoaf, 0) / cities.length,
    chickenKg: cities.reduce((sum, city) => sum + city.groceries.chickenKg, 0) / cities.length
  },
  utilities: {
    monthly: cities.reduce((sum, city) => sum + city.utilities.monthly, 0) / cities.length,
    internet: cities.reduce((sum, city) => sum + city.utilities.internet, 0) / cities.length
  },
  transport: {
    busTicket: cities.reduce((sum, city) => sum + city.transport.busTicket, 0) / cities.length,
    monthlyPass: cities.reduce((sum, city) => sum + city.transport.monthlyPass, 0) / cities.length,
    taxiKm: cities.reduce((sum, city) => sum + city.transport.taxiKm, 0) / cities.length,
    petrolLiter: cities.reduce((sum, city) => sum + city.transport.petrolLiter, 0) / cities.length
  },
  restaurant: {
    inexpensiveMeal: cities.reduce((sum, city) => sum + city.restaurant.inexpensiveMeal, 0) / cities.length,
    midRangeMeal: cities.reduce((sum, city) => sum + city.restaurant.midRangeMeal, 0) / cities.length,
    cappuccino: cities.reduce((sum, city) => sum + city.restaurant.cappuccino, 0) / cities.length
  }
};

// Get city data by ID
export const getCityById = (id: string): CityData | undefined => {
  return cities.find(city => city.id === id);
};

// Calculate cost of living ratio between two cities
export const calculateCOLRatio = (cityId1: string, cityId2: string): number => {
  const city1 = getCityById(cityId1);
  const city2 = getCityById(cityId2);
  
  if (!city1 || !city2) return 1;
  
  return city1.colIndex / city2.colIndex;
};

// Calculate purchasing power for a given salary in a specific city
export const calculatePurchasingPower = (salary: number, cityId: string): number => {
  const city = getCityById(cityId);
  
  if (!city) return salary;
  
  // Higher colIndex means lower purchasing power
  return (salary / city.colIndex) * 100;
};
