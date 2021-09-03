import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { Divider, Avatar, Grid, Paper } from '@material-ui/core';
import { addReview } from '../../redux/actions/types/productActions';
import swal from 'sweetalert';
import './Reviews.css';

export default function Reviews({ id }) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.root.productDetail);
  const currentUser = useSelector((state) => state.session.user);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [calification, setCalification] = useState(0);
  const [showReviews, setShowReviews] = useState(3);
  const [content, setContent] = useState('');

  const detailReviews = detail?.reviews?.slice(0, showReviews);
  const usuario = Object.entries(currentUser);

  //Reviews
  const totalReviews = detail.reviews;
  const idReviews = totalReviews?.map((el) => el.idUsuario);
  const includesss = idReviews?.includes(currentUser._id);

  //Cart order
  const userOrders = currentUser.orders;
  const carritoUsuarioConMap = userOrders?.map((el) => el.cart);
  const mapDentroDeCarrito = carritoUsuarioConMap?.map((el) =>
    el.map((ele) => ele.id),
  );
  const filtrarElMap = mapDentroDeCarrito?.map((ele) => ele.includes(id));
  const comproElProducto = filtrarElMap?.filter((el) =>
    el === 'true' ? 'true' : 'false',
  );
  const finalCompro = comproElProducto?.find((el) => el === true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (calification === 0) {
      return swal({
        title: 'Tu review debe tener al menos una estrella.',
        icon: 'error',
        buttons: [false, true],
      });
    }
    dispatch(
      addReview({
        content: content,
        id,
        calification: calification,
        idUsuario: currentUser._id,
      }),
    );
    setContent('');
    setCalification(0);
    window.location.reload();
  };

  const handleReviews = (e) => {
    e.preventDefault();
    if (e.target.value === 'verMas') {
      setShowReviews(showReviews + 3);
    } else if (e.target.value === 'verMenos') {
      setShowReviews(showReviews - 3);
    } else {
      setShowReviews(3);
    }
  };

  return (
    <div>
      <div className="container-reviews-div">
        {!usuario || usuario.length === 0 ? null : detail.stock ===
          0 ? null : !finalCompro ? null : (
          <div className="form-reviews">
            <form
              className="form-styles-detail"
              onSubmit={(e) => handleSubmit(e)}
              style={includesss ? { display: 'none' } : { display: 'block' }}
            >
              <div className="detail-rating">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        onChange={(e) => setCalification(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={
                          ratingValue <= (hover || rating)
                            ? '#ffc107'
                            : '#e4e5e9'
                        }
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>

              <textarea
                className="text-area"
                type="text"
                placeholder="Agregue su opinión sobre este producto..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="buttons-review">
                <button type="submit">calificar</button>
                <Link to={'/home'}>
                  <button className="back">volver</button>
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="detail-reviews">
        {detail.reviews && detail.reviews.length > 0 ? (
          <div className="container-reviews">
            <h1>Comentarios</h1>
            <ul>
              {detailReviews &&
                detailReviews.map((el, idx) => {
                  return (
                    <li key={idx}>
                      <Paper style={{ padding: '40px 20px' }}>
                        <Grid container wrap="nowrap" spacing={2}>
                          <Grid item>
                            <Avatar
                              alt="Remy Sharp"
                              src={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNWMQCa4lQMnbd0_uS3QTPGbrmoN3LGxACM4J78RHLYV3jTVttHgbZNA3e2DtItWhuv4&usqp=CAU'
                              }
                            />
                          </Grid>
                          <Grid
                            justifyContent="flex-start"
                            item
                            xs
                            zeroMinWidth
                          >
                            <h4 style={{ margin: 0, textAlign: 'left' }}>
                              {el.name}
                            </h4>
                            <Divider
                              variant="fullWidth"
                              style={{ margin: '10px 0' }}
                            />
                            <div className="detail-rating">
                              {[...Array(el.calification)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                  <label key={i}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={ratingValue}
                                    />
                                    <FaStar
                                      className="star"
                                      color={'#ffc107'}
                                      size={15}
                                    />
                                  </label>
                                );
                              })}
                            </div>
                            <p style={{ textAlign: 'left' }}>{el.content}</p>
                          </Grid>
                        </Grid>
                      </Paper>
                    </li>
                  );
                })}
            </ul>
            {detail.reviews.length > 3 ? (
              <div className="review-button">
                <button
                  className={
                    showReviews === detail.reviews.length ||
                    showReviews > detail.reviews.length
                      ? 'disable'
                      : null
                  }
                  value="verMas"
                  onClick={(e) => handleReviews(e)}
                >
                  Ver más
                </button>
                <button
                  className={
                    showReviews === 3 || showReviews < 3 ? 'disable' : null
                  }
                  value="verMenos"
                  onClick={(e) => handleReviews(e)}
                >
                  Ver menos
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
