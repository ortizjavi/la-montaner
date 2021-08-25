import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../redux/actions/types/adminActions';
import { Divider } from "@material-ui/core";
import './UserReviews.css'
import { NavLink } from 'react-router-dom';

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
        <div className='container-reviews'>
            <NavLink to='/dashboard'>
                <p>&#x2B05; Volver</p>
            </NavLink>
            <h1>Mis Comentarios y Calificaciones</h1>
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
                             return <p>Calificación: {e.calification} Estrellas</p>
                         })}
                         {el.reviews.map(e => {
                             if (e.idUsuario === user._id && e.content) 
                             return <p>Comentario: {e.content}</p>
                         })}
                     </div>
                 </div>
             )) : <h4>No has dejado comentario o puntaje sobre ningún producto todavía</h4>
             
         }   
       </div>
       
    )
}

export default UserReviewsTable;
