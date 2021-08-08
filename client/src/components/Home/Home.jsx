import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  searchProducts,  } from '../../actions/types/productActions.js';
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
  var sort = 'asc'
  
  useEffect(()=>{
    dispatch(searchProducts(sort, currentPage-1))
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
  
  
  return (
    <div>
      <NavBar/>
      <div className='Home-filter'>
        Ordenar: 
        <button className='home-button' onClick={() => handleSort('asc')}> A-Z </button>
        <button className='home-button' onClick={() => handleSort('desc')}> Z-A </button>
      </div>
      <main className='home-main'>
          <section>
            <Filters />
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
