import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home-wrapper">
      {/* Section with black background and header */}
      <div className="home-content">
        <div className="section header-section">
          <Header />
        </div>
      </div>

      {/* NOW ExploreMenu is outside padding-constrained content */}
      <div className="section">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* Back inside content */}
      <div className="home-content">
        <div className="section food-section">
          <FoodDisplay category={category} />
        </div>

        <div className="section footer-section">
          <AppDownload />
        </div>
      </div>
    </div>
  );
};

export default Home;
