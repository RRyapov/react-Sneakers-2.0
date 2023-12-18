import styles from "./Card.module.scss";
import { useState, useEffect } from "react";

function Card({
  isSelected,
  onPlus,
  onFavorite,
  removeFavorite,
  onDelete,
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
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickDelete = () => {
    onDelete({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  // useEffect(() => {
  //   removeFavorite();
  // }, [isFavorite]);

  useEffect(() => {
    console.log("Переменная изменилась");
  }, [isAdded]);

  return (
    <div className={styles.card}>
      <div className="favorite d-flex flex-column">
        <img
          className="button"
          width={32}
          height={32}
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked state"
          onClick={() => {
            onClickFavorite();
          }}
        />
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
            onClick={onClickDelete}
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
