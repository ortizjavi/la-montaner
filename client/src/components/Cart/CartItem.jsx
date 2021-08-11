import "./CartItem.css";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.image} width="50" alt={item.name} />
      </div>
      <Link to={`/home/${item.id}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>
      <p className="cartitem__price">${item.price}</p>
      <select
        value={item.stock}
        onChange={(e) => qtyChangeHandler(item.id, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.stock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
        <option>A</option>
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.id)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CartItem;
