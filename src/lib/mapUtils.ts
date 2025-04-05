
import { CityData, nationalAverages } from "@/data/cityData";

// Function to get a color based on cost of living index
export const getColorByColIndex = (colIndex: number): string => {
  // Colors from lowest to highest COL
  if (colIndex < 80) return '#138808'; // Green - much lower than average
  if (colIndex < 90) return '#5DC96A'; // Light green - lower than average
  if (colIndex < 100) return '#FFD700'; // Gold - slightly lower than average
  if (colIndex < 110) return '#FFA500'; // Orange - slightly higher than average
  if (colIndex < 120) return '#FF5733'; // Orange-red - higher than average
  return '#FF0000'; // Red - much higher than average
};

// Function to format currency (INR)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Function to calculate the percentage difference between two values
export const calculatePercentageDiff = (value1: number, value2: number): number => {
  return ((value1 - value2) / value2) * 100;
};

// Function to get a descriptive label for a percentage difference
export const getDiffLabel = (percentage: number): string => {
  if (percentage > 20) return 'Much higher';
  if (percentage > 5) return 'Higher';
  if (percentage > -5) return 'Similar';
  if (percentage > -20) return 'Lower';
  return 'Much lower';
};

// Function to calculate how far a salary will go in a specific city compared to national average
export const calculateRelativePurchasingPower = (
  salary: number,
  cityColIndex: number
): number => {
  // National average COL index is 100 by definition
  const nationalAveragePower = salary / 100;
  const cityPurchasingPower = salary / cityColIndex;
  
  return (cityPurchasingPower / nationalAveragePower) * 100;
};

// Function to format the percentage with a + sign for positive values
export const formatPercentage = (percentage: number): string => {
  return percentage > 0 
    ? `+${percentage.toFixed(1)}%` 
    : `${percentage.toFixed(1)}%`;
};

// Function to get emoji based on the difference
export const getDiffEmoji = (percentage: number): string => {
  if (percentage > 20) return '📈';
  if (percentage > 5) return '⬆️';
  if (percentage > -5) return '↔️';
  if (percentage > -20) return '⬇️';
  return '📉';
};

// Calculate the comparison between two cities for a specific item
export const compareItems = (
  item1: number,
  item2: number,
  lowerIsBetter: boolean = true
): {
  diff: number;
  percentage: string;
  label: string;
  emoji: string;
  isBetter: boolean;
} => {
  const diff = calculatePercentageDiff(item1, item2);
  const isBetter = lowerIsBetter ? diff < 0 : diff > 0;
  
  return {
    diff,
    percentage: formatPercentage(diff),
    label: getDiffLabel(diff),
    emoji: getDiffEmoji(diff),
    isBetter
  };
};

// Calculate how much monthly salary would be required in city2 to maintain 
// the same standard of living as with the given salary in city1
export const calculateEquivalentSalary = (
  salary: number,
  city1ColIndex: number,
  city2ColIndex: number
): number => {
  return (salary / city1ColIndex) * city2ColIndex;
};
