import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://656da16ebcc5618d3c23978f.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onDeletedCart = (obj) => {
    setCartItems((prev) => prev.filter((o) => o.imageUrl !== obj.imageUrl));
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://656da16ebcc5618d3c23978f.mockapi.io/cart/${id}`);
    // setCartItems((prev) => [...prev, obj]);
  };

  const searchCardItem = (imageUrl) => {
    return cartItems.some((o) => o.imageUrl === imageUrl);
  };

  const totalPrice = () => {
    return cartItems.reduce((a, { price }) => (a = a + price), 0);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} totalPrice={totalPrice} />
      {cartOpened && (
        <Drawer
          items={cartItems}
          onDelete={onDeletedCart}
          totalPrice={totalPrice}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clearBtn"
                src="/img/btn-remove.svg"
                alt="Clear button"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap justify-between">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={(obj) => onAddToCart(obj)}
                onDelete={(obj) => onDeletedCart(obj)}
                isSelected={searchCardItem(item.imageUrl)}
                onFavorite={() => console.log("Добавили в закладки")}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

// =============== пример использования UseEffect ===========================

// import React, { useState } from "react";
// import List from "./components/List";

// function App() {
//   const [visibleList, setVisibleList] = useState(true);

//   const toggleVisibleList = () => {
//     setVisibleList((visible) => !visible);
//   };

//   return (
//     <div className="App">
//       {visibleList && <List />}
//       <button onClick={toggleVisibleList}>Показать / Скрыть список</button>
//     </div>
//   );
// }
