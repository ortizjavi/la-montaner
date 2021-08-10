import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  searchProducts, filterProducts, getMaximumPrice } from '../../actions/types/productActions.js';
import NavBar from '../Navbar/NavBar';
import Filters from '../Filters/Fiters.jsx';
import ShowProducts from '../ShowProducts/ShowProducts';
import Footer from '../Footer/Footer';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.currentPage)
  const searchState = useSelector(state => state.searchProdustsState)
  const allProducts = useSelector( state => state.allProducts)

  const maxPrice = useSelector(state => state.maxPrice)
  let maxPrice1 = Math.ceil(maxPrice * (1/3))
  let maxPrice2 = Math.ceil(maxPrice * (2/3))


  var sort = 'asc'

  
  useEffect(()=>{
    dispatch(searchProducts(sort, currentPage-1))
    dispatch(getMaximumPrice('price'))
  },[])

  useEffect(() => {
    if(allProducts[0]>8){ 
      dispatch(searchProducts(sort, currentPage-1));

    }
  }, [currentPage])
  
  useEffect(() =>{
    if(searchState.length>=2){
      dispatch(searchProducts(sort, 0, searchState))
    }else{
    dispatch(searchProducts(sort, currentPage-1))
    }
  },[searchState])

  const handleSort = (param) => {
    sort = param;
    dispatch(searchProducts(sort, currentPage-1))
  }
  
  const onChangeFilter = (data) => {
    if(Object.values(data)[0] === 'none'){
      dispatch(searchProducts(sort, currentPage-1))
    }else{
      dispatch(filterProducts(data, sort, currentPage-1))
    }
  }

  const handlePriceSort = () => {

  }

  return (
    <div>
      <NavBar/>
      <div className='Home-filter'>
        Ordenar: 
        <button className='home-button' onClick={() => handleSort('asc')}> A-Z </button>
        <button className='home-button' onClick={() => handleSort('desc')}> Z-A </button>
        <li className='list_sidebar-li'>
          <select className='select-sidebar' name="price"  onChange={handlePriceSort}>
            <option id='none' value='none'>Quitar filtro</option>
            <option value="" disabled selected hidden>Precio</option>
            <option id='range1' value='range1'>0 - {maxPrice1}</option>
            <option id='range2' value='range2'>{maxPrice1+1} - {maxPrice2}</option>
            <option id='range3' value='range3'>{maxPrice2+1} - {maxPrice}</option>
          </select>
        </li>
    {/* <div className="slider-wrapper">
         <p>Precio</p>
         <input type="range" min="0" max="100" value="100" step="1"></input>
        </div> */}
      </div>
      <main className='home-main'>
          <section>
            <Filters  onChangeFilter={(e) => { onChangeFilter(e) }} />
          </section>
          <section className="items-container">
            <ShowProducts allProducts={allProducts}/>
          </section>
      </main>
      <footer>
          <Footer/>
      </footer>
    </div>
  )
}
