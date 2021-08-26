import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../redux/actions/types/adminActions';
import { Divider } from "@material-ui/core";
import './UserReviews.css'
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const UserReviewsTable = () =>{
    const user = useSelector((state) => state.session.user);
    const Products = useSelector( state => state.root.adminProducts)
    

    const dispatch = useDispatch()

    useEffect(() => {
       
        dispatch(getAdminProducts())
    }, [])
    let reviewsUSER = []
    let onlyReviews = Products?.filter(e => e.reviews)
    onlyReviews.map(e => e.reviews.map(el => el.idUsuario === user._id && reviewsUSER.push(e)))

    return (
        <>
            <NavLink to='/dashboard'>
                <p className='rev-volver'>&#x2B05; Volver</p>
            </NavLink>
        <div className='container-reviews'>
            <h1 className='rev-title'>Mis Comentarios y Calificaciones</h1>
         {
             reviewsUSER ?
             reviewsUSER.map(el => (
                 
                 <div className='rev-card'>
                     <div className='rev-product'>
                        <NavLink to={`/home/${el._id}`}>
                            <img className="rev-img" src={el?.img[0]} alt="" />
                        </NavLink>
                     </div>
                     <div className='rev-content'>
                        <NavLink to={`/home/${el._id}`}>
                            <h4>{el.name}</h4>
                        </NavLink>
                         <Divider
                              variant="fullWidth"
                              style={{ margin: "10px 0" }}
                            />
                          {el.reviews.map(e => {
                             if (e.idUsuario === user._id && e.calification) 
                            //  return <p>Mi calificación: {e.calification} Estrellas</p>,
                            
                                return <FaStar className="star" size={30} />
                            
                         })}
                         {el.reviews.map(e => {
                             if (e.idUsuario === user._id && e.content) 
                             return <p>Mi comentario: {e.content}</p>
                         })}
                     </div>
                 </div>
             )) : <h4>No has dejado comentario o puntaje sobre ningún producto todavía</h4>
             
         }   
       </div>
       <NavLink to='/dashboard'>
                <p className='rev-volver'>&#x2B05; Volver</p>
       </NavLink>
       </>
       
    )
}

export default UserReviewsTable;
