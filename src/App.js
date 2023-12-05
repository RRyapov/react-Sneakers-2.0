import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://656da16ebcc5618d3c23978f.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} />
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap justify-between">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onPlus={(obj) => onAddToCart(obj)}
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
