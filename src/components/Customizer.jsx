import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Price from './Price';
import '../styles/Customizer.css';

const options = {
  tshirt: {
    'Neck Type': ['Round Neck', 'V Neck', 'Polo'],
    'Sleeve Type': ['Half', 'Full'],
    'Fit': ['Regular', 'Slim', 'Oversized'],
    'Fabric': ['Cotton', 'Polyester', 'Modal'],
    'Color': ['White', 'Blue', 'Black', 'Red'],
    'Pocket': ['Without Pocket', 'With Pocket'],
  },
  shirt: {
    'Collar': ['Classic', 'Mandarin', 'Cuban'],
    'Fit': ['Slim', 'Relaxed', 'Oversized'],
    'Fabric': ['Cotton', 'Linen', 'Silk'],
    'Color': ['White', 'Blue', 'Black', 'Red'],
    'Sleeves': ['Full', 'Half'],
    'Pockets': ['None', 'One'],
  },
  pants: {
    'Type': ['Chinos', 'Trousers', 'Cargo'],
    'Fit': ['Straight', 'Slim', 'Bootcut'],
    'Rise': ['Mid', 'High', 'Low'],
    'Fabric': ['Cotton Twill', 'Linen', 'Poly Blend'],
    'Color': ['White', 'Blue', 'Black', 'Red'],
    'Waistband': ['Belt Loops', 'Elastic'],
  },
  outerwear: {
    'Fabric': ['Wool', 'Denim', 'Cotton', 'Leather'],
    'Collar': ['Regular', 'Mandarin', 'Hoodie'],
    'Closure Type': ['Zip', 'Buttons'],
    'Color': ['White', 'Blue', 'Black', 'Red'],
  }
};

const imageMap = {
  tshirt: '/images/tshirt.png',
  shirt: '/images/shirt.png',
  pants: '/images/pants.png',
  outerwear: '/images/outerwear.png',
};

const relevantOptions = {
  tshirt: ['Neck Type', 'Sleeve Type', 'Color', 'Pocket'],
  shirt: ['Collar', 'Color', 'Sleeves', 'Pockets'],
  pants: ['Type', 'Fit', 'Color'],
  outerwear: ['Collar', 'Color'],
};

const generateImagePath = (category, selections) => {
  const optionValues = relevantOptions[category]
    .map((label) => selections[label])
    .filter(Boolean)
    .map((val) => val.toLowerCase().replace(/\s+/g, '_'));

  return `/images/${category}/${optionValues.join('_')}.png`;
};

export default function Customizer() {
  const navigate = useNavigate();

  const getDefaultSelections = (category) =>
    Object.fromEntries(
      Object.entries(options[category]).map(([label, values]) => [label, values[0]])
    );

  const [category, setCategory] = useState('tshirt');
  const [selections, setSelections] = useState(() => getDefaultSelections('tshirt'));
  const [previewImage, setPreviewImage] = useState(() =>
    generateImagePath('tshirt', getDefaultSelections('tshirt'))
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const defaultSelections = getDefaultSelections(category);
    setSelections(defaultSelections);
    setPreviewImage(generateImagePath(category, defaultSelections));
  }, [category]);

  useEffect(() => {
    const relevantKeys = relevantOptions[category];
    const hasAllSelections = relevantKeys.every((key) => selections[key]);

    if (hasAllSelections) {
      const path = generateImagePath(category, selections);
      setPreviewImage(path);
    }
  }, [selections, category]);

  // Update price from <Price /> via callback
  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
    <br/>
    <br/>

       <div className="customizer-container">
        <div className="customizer-form">
          <br />
          <h1>Customize Your Clothing</h1>

          <div className="mb-4">
            <h2 className="mb-2 font-medium">Select Category</h2>
            <div className="category-radio-group">
              {Object.keys(options).map((cat) => (
                <label key={cat} className="radio-label">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      const defaultSelections = getDefaultSelections(newCategory);
                      setCategory(newCategory);
                      setSelections(defaultSelections);
                    }}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>
            <br />
          </div>

          {Object.entries(options[category]).map(([label, values]) => (
            <div className="mb-4" key={label}>
              <div className="custom-dropdown">
                <button
                  className="dropdown-header"
                  onClick={() =>
                    setSelections((prev) => ({
                      ...prev,
                      [`${label}_open`]: !prev[`${label}_open`],
                    }))
                  }
                >
                  <h3>{label}</h3>
                  <span className="arrow">
                    {selections[`${label}_open`] ? '▲' : '▼'}
                  </span>
                </button>

                {selections[`${label}_open`] && (
                  <ul className="dropdown-list">
                    {values.map((val) => (
                      <li
                        key={val}
                        className="dropdown-option"
                        onClick={() =>
                          setSelections((prev) => ({
                            ...prev,
                            [label]: val,
                            [`${label}_open`]: false,
                          }))
                        }
                      >
                        {val}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <br />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={() => setShowOverlay(true)}>
              <p>Proceed</p>
            </button>
            <button onClick={() => navigate(-1)}>
              <p>Back</p>
            </button>
          </div>
        </div>
        <div className="preview-section">
          <br />
          <br />
          <br/>
          <h2>Preview</h2>
          <br />
          <div className="image-wrapper">
            <img
              src={previewImage}
              alt={`${category} preview`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imageMap[category];
            }}
    />
          </div>
        </div>

        {showOverlay && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Confirm Your Selections</h2>
              <ul className="list-disc">
                {Object.entries(selections)
                  .filter(([key]) => !key.endsWith('_open'))
                  .map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
              </ul>

              {/* Get and update price using <Price /> */}
              <Price category={category} selections={selections} onPriceChange={handlePriceChange} />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={async () => {
                    
                    const response = await fetch("http://localhost:5000/api/customizations", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      credentials: "include",
                      body: JSON.stringify({
                        category,
                        selections: Object.fromEntries(
                          Object.entries(selections).filter(([key]) => !key.endsWith("_open"))
                        ),
                        price: price
                      })
                    });

                    const result = await response.json();
                    if (response.ok) {
                      console.log("Error");
                      alert("Customization confirmed and saved!");
                      setShowOverlay(false);
                    } else {
                      alert("Something went wrong. Please try again.");
                    }
                  }}
                >
                  <p>Confirm</p>
                </button>
                <button onClick={() =>setShowOverlay(false)}>
              <p>Back</p>
            </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
