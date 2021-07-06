import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const itemsByCategory = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  })
  const itemsToDisplay = itemsByCategory.filter((item) => 
    (item.name.includes(search))
  )
  const display = () => {
    if(search.length > 0) {
      return itemsToDisplay.map((item) => (
        <Item key={item.id} name={item.name} category={item.category} />
      ))
    } else { return itemsByCategory.map((item) => (
      <Item key={item.id} name={item.name} category={item.category} />
    ))
    }
  }

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter 
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        search={search}
      />
      <ul className="Items">
        {display()}
      </ul>
    </div>
  );
}

export default ShoppingList;
