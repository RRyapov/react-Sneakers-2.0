import Card from "../components/Card/Card";

function Home({
  items,
  onChangeSearchInput,
  searchValue,
  setSearchValue,
  onAddToFavorite,
  onAddToCart,
  onRemoveFavorite,
  searchCardItem,
  onRemoveCardItem,
}) {
  const renderItems = () => {
    return items
      .filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((item, index) => {
        return (
          <Card
            key={`${index} ${item}`}
            data={item}
            onCartPlus={onAddToCart}
            onCartDelete={onRemoveCardItem}
            onFavorite={onAddToFavorite}
            removeFavorite={onRemoveFavorite}
            searchCardItem={searchCardItem}
          />
        );
      });
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
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

      <div className="d-flex flex-wrap justify-between">{renderItems()}</div>
    </div>
  );
}

export default Home;
