import Card from "../components/Card/Card";

function Favorites({ items, onRemoveFavorite, onAddToFavorite }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки </h1>
      </div>

      <div className="d-flex flex-wrap justify-between">
        {items.map((item, index) => (
          <Card
            key={`${index} ${item}`}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            removeFavorite={() => onRemoveFavorite(item.favId)}
            onFavorite={onAddToFavorite}
            favorited={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
