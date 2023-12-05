function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img
          width={40}
          height={40}
          src="/img/logo_1.png"
          alt="sneakers_logotype"
        />
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img
            width={18}
            height={18}
            src="/img/basket.svg"
            alt="basket_picture"
          />
          <span>1205 руб.</span>
        </li>
        <li>
          <img
            width={18}
            height={18}
            src="/img/profile.svg"
            alt="profile_logo"
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
