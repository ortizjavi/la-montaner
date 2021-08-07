import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  searchProducts,  } from '../../actions/types/productActions.js';
import NavBar from '../Navbar/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import ShowProducts from '../ShowProducts/ShowProducts';
import './Home.css';


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
      <NavBar/>
      <div className='Home-filter'>
        Ordenar: 
        <button className='home-button' onClick={()=> alert('Otro par de métodos por hacer 🤷‍♀️🤦‍♂️')}>  A-Z </button>
      </div>
      <main className='home-main'>
          <section>
            <Sidebar/>
          </section>
          <section className="items-container">
            <ShowProducts allProducts={allProducts}/>
          </section>
      </main>
    </div>
  )
}
