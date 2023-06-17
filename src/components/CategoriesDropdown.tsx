import React, { useState, useEffect } from "react";
import { getCategories } from "../api";

interface Category {
  id: string;
  name: string;
}

const CategoriesDropdown: React.FC<{
  onCategorySelect: (categoryId: number | null) => void;
}> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === "") {
      onCategorySelect(null);
    } else {
      onCategorySelect(parseInt(event.target.value));
    }
  };

  return (
    <select onChange={handleCategoryChange}>
      <option value="">All Categories</option>
      {categories.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesDropdown;
