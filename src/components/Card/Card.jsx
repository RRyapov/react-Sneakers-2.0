import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

function Card({
  searchCardItem,
  data,
  onCartPlus,
  onFavorite,
  removeFavorite,
  onCartDelete,
  loading = false,
}) {
  const { id, title, price, imageUrl, favId, isFavorite } = data ?? {};
  const cartId = searchCardItem(imageUrl)?.cartId;

  const onClickPlus = () => {
    onCartPlus({ title, imageUrl, price, id });
  };

  const onAddFavorite = () => {
    onFavorite({ title, imageUrl, price, id });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={420}
          height={460}
          viewBox="0 0 400 460"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="2" ry="2" width="155" height="155" />
          <rect x="0" y="170" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="190" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="233" rx="5" ry="5" width="80" height="24" />
          <rect x="124" y="225" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite d-flex flex-column">
            {isFavorite ? (
              <img
                className="button"
                width={32}
                height={32}
                src="/img/heart-liked.svg"
                alt="Liked state"
                onClick={() => {
                  removeFavorite(favId);
                }}
              />
            ) : (
              <img
                className="button"
                width={32}
                height={32}
                src="/img/heart-unliked.svg"
                alt="Unliked state"
                onClick={() => {
                  onAddFavorite();
                }}
              />
            )}
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {!!cartId ? (
              <img
                className={styles.plus}
                onClick={() => onCartDelete(cartId)}
                src="/img/btn-checked.svg"
                alt="Plus"
              />
            ) : (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src="/img/btn-plus.svg"
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
