import React, { useEffect } from 'react';

const priceMap = {
  tshirt: {
    'Neck Type': { 'Round Neck': 400, 'V Neck': 420, 'Polo': 500 },
    'Sleeve Type': { 'Half': 0, 'Full': 100 },
    'Fit': { 'Regular': 0, 'Slim': 20, 'Oversized': 30 },
    'Fabric': { 'Cotton': 100, 'Polyester': 80, 'Modal': 150 },
    'Pocket': { 'Without Pocket': 0, 'With Pocket': 80 },
  },
  shirt: {
    'Collar': { 'Classic': 600, 'Mandarin': 700, 'Cuban': 700 },
    'Fit': { 'Slim': 50, 'Relaxed': 10, 'Oversized': 100 },
    'Fabric': { 'Cotton': 50, 'Linen': 100, 'Silk': 200 },
    'Sleeves': { 'Half': 0, 'Full': 100 },
    'Pockets': { 'None': 0, 'One': 100 },
  },
  pants: {
    'Type': { 'Chinos': 600, 'Trousers': 800, 'Cargo': 750 },
    'Fit': { 'Straight': 0, 'Slim': 50, 'Bootcut': 80 },
    'Rise': { 'Mid': 0, 'High': 50, 'Low': 50 },
    'Fabric': { 'Cotton Twill': 150, 'Linen': 200, 'Poly Blend': 80 },
    'Waistband': { 'Belt Loops': 0, 'Elastic': 50 },
  },
  outerwear: {
    'Fabric': { 'Wool': 1000, 'Denim': 800, 'Cotton': 600, 'Leather': 1500 },
    'Collar': { 'Regular': 0, 'Mandarin': 20, 'Hoodie': 200 },
    'Closure Type': { 'Zip': 0, 'Buttons': 80 },
  },
};

export default function Price({ category, selections, onPriceChange }) {
  if (!selections) return null;

  const calculatePrice = () => {
    const priceData = priceMap[category];
    if (!priceData) return 0;

    return Object.entries(priceData).reduce((total, [key, optionPrices]) => {
      const selected = selections[key];
      const price = optionPrices[selected] || 0;
      return total + price;
    }, 0);
  };

  const price = calculatePrice();

  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(price);
    }
  }, [price, onPriceChange]);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Total Price: ₹{price}</h2>
    </div>
  );
}
