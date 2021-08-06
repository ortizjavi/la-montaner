import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{ Link } from 'react-router-dom';
import {  searchProducts,  } from '../../actions/types/productActions.js';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading.js';

export default function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage)
  const searchState = useSelector(state => state.searchProdustsState)
  const allProducts = useSelector( state => state.allProducts)

  useEffect(()=>{
    dispatch(searchProducts(currentPage-1))
  },[])

  useEffect(() => {
    if(allProducts[0]>8){ 
      dispatch(searchProducts(currentPage-1));
    }
  }, [currentPage])
  
  useEffect(() =>{
    if(searchState.length>=2){
      dispatch(searchProducts(0, searchState))
    }else{
    dispatch(searchProducts(currentPage-1))
    }
  },[searchState])
  
  return (
    <div>
      <SearchBar/>
      <div>
          <section className="items-container">
            {
                allProducts.length ?
                allProducts[0]>0 ?
                <>
                  {
                    allProducts[1].map( item =>
                      <div className='product_container' key={item._id}>
                          <Link className='link' to={`/home/${item?._id}`}>{item?.name}</Link>
                              <br></br>
                              <Link className='' to={`/home/${item?._id}`}>
                                  <picture className='image_contain'>
                                      <img className="item_image" src={item?.img} alt="Imagen de Birra" />
                                  </picture>
                          </Link>
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
          </section>
      </div>
    </div>
  )
}
