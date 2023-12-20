import styles from "./Card.module.scss";
import { useState, useEffect } from "react";

function Card({
  isSelected,
  onPlus,
  onFavorite,
  removeFavorite,
  onDelete,
  id,
  title,
  imageUrl,
  price,
}) {
  const [isAdded, setIsAdded] = useState(isSelected);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsAdded(isSelected);
  }, [isSelected]);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price, id });
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const onAddFavorite = () => {
    onFavorite({ title, imageUrl, price, id });
  };

  // useEffect(() => {
  //   removeFavorite();
  // }, [isFavorite]);

  return (
    <div className={styles.card}>
      <div className="favorite d-flex flex-column">
        {isFavorite ? (
          <img
            className="button"
            width={32}
            height={32}
            src="/img/heart-liked.svg"
            alt="Liked state"
            onClick={() => {
              removeFavorite();
              onClickFavorite();
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
              onClickFavorite();
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
        {isAdded ? (
          <img
            className={styles.plus}
            onClick={onDelete}
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
    </div>
  );
}

export default Card;
