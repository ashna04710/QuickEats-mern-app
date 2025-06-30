import React, { useEffect, useState } from 'react';
import './Header.css';

const images = [
  'https://img.goodfon.com/wallpaper/nbig/5/ec/food-pie-berries.webp',
  'https://t3.ftcdn.net/jpg/08/30/36/24/360_F_830362443_3P82WDlEppAJDZp1n0o6MZMTyiq69kwp.jpg',
  'https://s1.1zoom.me/big0/841/Strawberry_Black_background_Cream_Bowl_589568_1280x786.jpg'
];

const Header = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-carousel">
      {images.map((img, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="header-contents">
        <h2>Order Your Favorite Food Here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise.
        </p>
        <button onClick={() => {
          const el = document.getElementById('explore-menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
