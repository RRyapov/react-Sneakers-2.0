function Drawer({ onClose, onDelete, onRemove, totalPrice, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove button"
          />
        </h2>

        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img
            className="mb-20"
            width={"120px"}
            height={"120px"}
            src="/img/empty-cart.img"
            alt="Empty cart"
          />
          <h2>Корзина пустая</h2>
          <p className="opacity-6">
            Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
          </p>
          <button className="greenButton">
            <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
          </button>
        </div>

        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              />
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img
                onClick={() => {
                  onDelete({
                    title: obj.title,
                    imageUrl: obj.imageUrl,
                    price: obj.price,
                  });
                  onRemove(obj.id);
                }}
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="Remove button"
              />
            </div>
          ))}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex">
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice()} руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>{(totalPrice() * 0.05).toFixed(2)} руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ
            <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
