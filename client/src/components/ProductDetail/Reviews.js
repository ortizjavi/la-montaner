import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { addReview, getProductDetail} from "../../redux/actions/types/productActions";
import './Reviews.css';

const Reviews = ({id}) => {
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.root.productDetail);
    let currentUser = useSelector((state) => state.session.user);
    const ordenes = useSelector((state) => state.admin.orders); 

    const [ rating, setRating ] = useState(null);
    const [ hover, setHover ] = useState(null);
    const [calification, setCalification] = useState(0);
    const [ showReviews, setShowReviews ] = useState(3);
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState("");

    const detailReviews = detail?.reviews?.slice(0, showReviews);
    let usuarioPrueba = currentUser;
    let usuario = Object.entries(currentUser);

    //Reviews
    let totalReviews = detail.reviews;
    let idReviews = totalReviews?.map(el => el.idUsuario);
    let mapReviews = idReviews?.map(el => el === currentUser._id ? true : false);
    let includesss = idReviews?.includes(currentUser._id);

    //Cart order
    let userOrders = currentUser.orders;
    let carritoUsuarioConMap = userOrders?.map(el => el.cart);
    let mapDentroDeCarrito = carritoUsuarioConMap?.map(el => el.map(ele => ele.id))
    let filtrarElMap = mapDentroDeCarrito?.map(ele => ele.includes(id))
    let comproElProducto = filtrarElMap?.filter(el => el === 'true' ? 'true' : 'false');
    let finalCompro = comproElProducto?.find(el => el === true);

// useEffect(() => {
//     getProductDetail(id);
// }, [dispatch, detail.reviews])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (calification < 1 || calification > 5) {
          setErrors("");
        }
        dispatch(
          addReview({
            content: content,
            id,
            calification: calification,
            idUsuario: currentUser._id,
          })
        );
        setContent("");
        setCalification(0);
      };
    
      const handleReviews = (e) => {
        e.preventDefault();
        if(e.target.value === 'verMas'){
          setShowReviews(7);
        } else if(e.target.value === 'verMenos') {
          setShowReviews(3);
        } else{
          setShowReviews(3);
        }
      }

    return (
        <div>
            <div className='reviews-div'>
            {!usuario || usuario.length === 0 ? null : 
              detail.stock === 0 ? null : 
              !finalCompro ? null :
              (
                <div>
                  <form onSubmit={(e) => handleSubmit(e)} style={includesss ? {display: 'none'} : {display: 'block'}}>
                    <textarea
                      className="text-area"
                      type="text"
                      placeholder="Agregue su opinión sobre este producto..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='detail-rating'>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                          <label>
                            <input 
                              type='radio'
                              name='rating'
                              value={ratingValue}
                              onClick={() => setRating(ratingValue)}
                              onChange={(e) => setCalification(ratingValue)}
                            />
                            <FaStar 
                              className='star'
                              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                              size={30}
                              onMouseEnter={() => setHover(ratingValue)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        ); 
                      })}
                      <button type="submit">calificar</button>
                      <Link to={"/home"}>
                        <button className="back">volver</button>
                      </Link>
                    </div>
                  </form>
                </div>
              ) }
            </div>

            <div>
            {detail.reviews && detail.reviews.length > 0 ? (
              <div className='container-reviews'>
                <h1>Comentarios</h1>
                <ul>
                  {detailReviews &&
                    detailReviews.map((el, idx) => {
                      return (
                        <li key={idx}>
                          <Paper style={{ padding: "40px 20px" }}>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <Avatar alt="Remy Sharp" src={ 'https://cdn.iconscout.com/icon/free/png-256/care-emoji-with-beer-2419208-2012657.png'} />
                              </Grid>
                              <Grid justifyContent="flex-start" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>
                                  {el.name}
                                </h4>
                                <Divider
                              variant="fullWidth"
                              style={{ margin: "10px 0" }}
                            />
                      <div className='detail-rating'>
                        {[...Array(el.calification)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label>
                            <input 
                              type='radio'
                              name='rating'
                              value={ratingValue}
                            />
                            <FaStar 
                              className='star'
                              color={'#ffc107'}
                              size={15}
                            />
                          </label>
                          
                        ); 
                      })}
                      </div>
                      <p style={{ textAlign: "left" }}>{el.content}</p>
                              </Grid>
                            </Grid>
                          </Paper>
                        </li>
                      );
                    })}
                </ul>
                {
                  detail.reviews.length > 3 ? (
                    <div className='review-button'>
                  <button value='verMas' onClick={(e) => handleReviews(e)}>Ver más</button>
                  <button value='verMenos' onClick={(e) => handleReviews(e)}>Ver menos</button>
                  </div>
                  ) : null
                }
              </div>
            ):null}
            </div>
        </div>
    )
}

export default Reviews;