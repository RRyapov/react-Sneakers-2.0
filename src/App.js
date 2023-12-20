import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/items")
      .then((res) => {
        setItems(res.data);

        axios
          .get("https://656da16ebcc5618d3c23978f.mockapi.io/cart")
          .then((resCart) => {
            setItems(
              res.data.map((i) =>
                resCart.data.some((c) => c.id === i.id)
                  ? {
                      ...i,
                      cartId: resCart.data.find((c) => c.id === i.id).cartId,
                    }
                  : i
              )
            );

            setCartItems(resCart.data);
          });
      });

    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/cart")
      .then((res) => setCartItems(res.data));

    axios.get("https://657da8b73e3f5b189462e862.mockapi.io/favourite");
  }, []);

  // ===================================================Методы компонентов===================================================

  const onAddToCart = (obj) => {
    axios
      .post("https://656da16ebcc5618d3c23978f.mockapi.io/cart", obj)
      .then((res) => {
        setCartItems((prev) => [...prev, res.data]);

        setItems((prev) =>
          prev.map((i) =>
            i.id === res.data.id
              ? {
                  ...i,
                  cartId: res.data.cartId,
                }
              : i
          )
        );
      });
  };

  const onAddToFavorite = (obj) => {
    axios
      .post("https://657da8b73e3f5b189462e862.mockapi.io/favourite", obj)
      .then((res) => {
        setFavorites((prev) => [...prev, res.data]);

        setItems((prev) =>
          prev.map((i) =>
            i.id === res.data.id
              ? {
                  ...i,
                  favId: res.data.favId,
                }
              : i
          )
        );
      });
  };

  const onRemoveCardItem = (id) => {
    axios
      .delete(`https://656da16ebcc5618d3c23978f.mockapi.io/cart/${id}`)
      .then(() => {
        axios
          .get("https://656da16ebcc5618d3c23978f.mockapi.io/cart")
          .then((res) => setCartItems(res.data));
      });
  };

  const onRemoveFavorite = (id) => {
    axios
      .delete(`https://657da8b73e3f5b189462e862.mockapi.io/favourite/${id}`)
      .then(() => {
        axios
          .get("https://657da8b73e3f5b189462e862.mockapi.io/favourite")
          .then((res) => setFavorites(res.data));
      });
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

  //===================================================завершение блока методов===================================================

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} totalPrice={totalPrice} />
      {cartOpened && (
        <Drawer
          items={cartItems}
          totalPrice={totalPrice}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveCardItem}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              onChangeSearchInput={onChangeSearchInput}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              onRemoveFavorite={onRemoveFavorite}
              searchCardItem={searchCardItem}
              onRemoveCardItem={onRemoveCardItem}
            />
          }
        />
        <Route path="/favorites" element={<Favorites items={favorites} />} />
      </Routes>
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
