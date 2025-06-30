import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './SearchResults.css';

const SearchResults = () => {
  const { food_list } = useContext(StoreContext);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';

  const filteredFoods = food_list.filter(item => {
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();
    return name.includes(query) || category.includes(query);
  });

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {filteredFoods.length > 0 ? (
        <div className="food-display-list">
          {filteredFoods.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p>No items matched your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
