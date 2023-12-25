import Card from "../components/Card/Card";

function Favorites({
  items,
  onRemoveFavorite,
  onAddToFavorite,
  searchCardItem,
  onAddToCart,
  onRemoveCardItem,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки </h1>
      </div>

      <div className="d-flex flex-wrap justify-between">
        {items.map((item, index) => (
          <Card
            key={`${index} ${item}`}
            data={item}
            onFavorite={onAddToFavorite}
            removeFavorite={onRemoveFavorite}
            onCartPlus={onAddToCart}
            onCartDelete={onRemoveCardItem}
            searchCardItem={searchCardItem}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
