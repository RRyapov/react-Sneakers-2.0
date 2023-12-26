import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(true);
  const isAllReqLoading = isLoading || isLoadingCart || isLoadingFavorite;

  // ===================================================Запросы===================================================
  const getReqFavourite = () => {
    setIsLoadingFavorite(true);
    axios
      .get("https://657da8b73e3f5b189462e862.mockapi.io/favourite")
      .then((res) => {
        setItems((items) =>
          items.map((item) => {
            const favItem = res.data.find((itemFav) => itemFav.id === item.id);
            if (favItem?.id) {
              return {
                ...item,
                favId: favItem.favId,
                isFavorite: true,
              };
            }
            setIsLoadingFavorite(false);
            return { ...item, isFavorite: false };
          })
        );
      });
  };

  const getReqCart = () => {
    setIsLoadingCart(true);
    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/cart")
      .then((resCart) => {
        setCartItems(resCart.data);
        setIsLoadingCart(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://656da16ebcc5618d3c23978f.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);

        getReqFavourite();
        getReqCart();
      });
  }, []);

  // ===================================================Работа с корзиной===================================================

  const onAddToCart = (obj) => {
    axios
      .post("https://656da16ebcc5618d3c23978f.mockapi.io/cart", obj)
      .then(() => getReqCart());
  };

  const onRemoveCardItem = (id) => {
    axios
      .delete(`https://656da16ebcc5618d3c23978f.mockapi.io/cart/${id}`)
      .then(() => getReqCart());
  };

  const searchCardItem = (imageUrl) => {
    return cartItems.find((o) => o.imageUrl === imageUrl);
  };

  const totalPrice = () => {
    return cartItems.reduce((a, { price }) => (a = a + price), 0);
  };

  // ===================================================Работа с избранным===================================================

  const onAddToFavorite = (obj) => {
    if (items.find((item) => item.id === obj.id).isFavorite) {
      alert("Вы уже добавили этот товар в избранное");
    } else {
      axios
        .post("https://657da8b73e3f5b189462e862.mockapi.io/favourite", obj)
        .then((res) => {
          setItems((prev) =>
            prev.map((i) =>
              i.id === res.data.id
                ? {
                    ...i,
                    favId: res.data.favId,
                    isFavorite: true,
                  }
                : i
            )
          );
        });
    }
  };

  const onRemoveFavorite = (id) => {
    axios
      .delete(`https://657da8b73e3f5b189462e862.mockapi.io/favourite/${id}`)
      .then(() => getReqFavourite());
  };

  const getFavorites = useCallback(() => {
    return items.filter(({ isFavorite }) => isFavorite);
  }, [items]);

  //===================================================Остальные методы===================================================
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} totalPrice={totalPrice} />
      {isAllReqLoading ? (
        <div className="loading">Подождите...</div>
      ) : (
        <>
          {cartOpened && (
            <Drawer
              items={cartItems}
              totalPrice={totalPrice()}
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
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  items={getFavorites()}
                  onAddToCart={onAddToCart}
                  onRemoveCardItem={onRemoveCardItem}
                  searchCardItem={searchCardItem}
                  onRemoveFavorite={onRemoveFavorite}
                  onAddToFavorite={onAddToFavorite}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
