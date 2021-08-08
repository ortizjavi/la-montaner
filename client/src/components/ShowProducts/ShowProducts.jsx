import React from 'react';
import{ NavLink } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading.js';
import './ShowProducts.css'

const ShowProducts = ({allProducts}) => {
  
  return (
      <>
            {
                allProducts.length ?
                allProducts[0]>0 ?
                <>
                  {
                    allProducts[1].map( item =>
                      <div className='sp-product_container' key={item._id}>
                          <NavLink className='sp-link' to={`/home/${item?._id}`}>
                            <h5 className='link-name'>{item?.name}</h5>
                          </NavLink>
                              <NavLink className='' to={`/home/${item?._id}`}>
                                  <div className='image_contain'>
                                      <img className="item_image" src={item?.img[0]} alt="" />
                                  </div>
                          </NavLink>
                          <button className='sp-button' onClick={()=>alert('Buena desición')}>Comprar</button>
                      </div>
                    )
                  } 
                  {allProducts[0] > 8 && <Pagination response={allProducts[0]}/>}
                </>
                :
                    <h2> 😢 No hay productos que coincidan</h2>
                :
                  <Loading/>
            }
   </>
  )
}

export default ShowProducts;