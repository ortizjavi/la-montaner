import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  searchProducts, filterProducts, getMaximumPrice, filterByPrice, selectCategoryAction,currentPageAction,searchProductsAction } from '../../actions/types/productActions.js';
import NavBar from '../Navbar/NavBar';
import Filters from '../Filters/Filters.jsx';
import ShowProducts from '../ShowProducts/ShowProducts';
import Footer from '../Footer/Footer';
import './Home.css';

export default function Home() {

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.root.currentPage)
  const searchState = useSelector(state => state.root.searchProdustsState)
  const allProducts = useSelector( state => state.root.allProducts)
  const currentCategoryState = useSelector( state => state.root.currentCategoryState)
  const maxPrice3 = useSelector(state => state.maxPrice)
  const [rangePrice, setRangePrice] = useState('')
  const [leftFilter, setLeftFilter] = useState('')

  const [sort, setSort] = useState('asc')
  const maxPrice1 = Math.ceil(maxPrice3 * (1/3))
  const maxPrice2 = Math.ceil(maxPrice3 * (2/3))
  // var sort = 'asc'
  
  useEffect(()=>{
    let param = {sort, pageNumber: 0, name: searchState, category:currentCategoryState }
    dispatch(searchProducts(param))
    dispatch(getMaximumPrice('price'))
  },[])

  useEffect(()=>{
    setRangePrice('')
    setLeftFilter('') 
    if(currentCategoryState !== 'vertodos') dispatch(searchProductsAction(''))
    let param = {sort, pageNumber: 0, name: searchState, category:currentCategoryState }
    dispatch(currentPageAction(1))    
    const act =() => dispatch(searchProducts(param))
    act()
  },[currentCategoryState])

  useEffect(() => {
      
      if(leftFilter) return dispatch(filterProducts(leftFilter, sort, currentPage-1))
      if(rangePrice){
      console.log('Home/range',rangePrice)
      return dispatch(filterByPrice(rangePrice, currentPage-1))
      
    }
    if(allProducts[0]>8){ 
    let param = {sort, pageNumber: currentPage-1, name: searchState, category:currentCategoryState }
      dispatch(searchProducts(param));
    }
  }, [currentPage])
  
  useEffect(() =>{
    dispatch(currentPageAction(1))   
    setRangePrice('')
    setLeftFilter('') 
    if(searchState.length>=2){
      //current page arcodeado si la respuesta es mas de paginado no busca
      dispatch(selectCategoryAction('vertodos'))
      let param = {sort, pageNumber: currentPage-1, name: searchState, category:'vertodos' }
      dispatch(searchProducts(param))
     } else{
      let param = {sort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
    dispatch(searchProducts(param))
    }
  },[searchState])

  const handleSort = (paramsort) => {
    setSort(paramsort)
    let param = {sort:paramsort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
    dispatch(searchProducts(param))
  }
  
  const onChangeFilter = (data) => {
    setRangePrice('')
    setLeftFilter(data)
    if(Object.values(data)[0] === 'none'){
      let param = {sort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
      dispatch(searchProducts(param))
    }else{
      dispatch(filterProducts(data, sort, 0))
    }
  }
  
  var range = []
  
  const handlePriceSort = (e) => {
    setLeftFilter('')
    dispatch(currentPageAction(1))


    if(e.target.value === '') {
      let param = {sort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
      dispatch(searchProducts(param))
    } else {
      // var range = []
      dispatch(selectCategoryAction(''))
      dispatch(currentPageAction(1))
      if(e.target.value === 'range1') range = [0, maxPrice1]
      if(e.target.value === 'range2') range = [maxPrice1+1, maxPrice2] 
      if(e.target.value === 'range3') range = [maxPrice2+1, maxPrice3]
      dispatch(filterByPrice(range, 0))
      setRangePrice(range)
    }
  }
  console.log('Home/rangeprice: ',rangePrice[0])
  return (
    <div>
      <NavBar/>
      <div className='Home-filter'>
        Ordenar: 
        <button className={`${sort ==='asc' ? "actived" : 'Nav-button'}`} onClick={() => handleSort('asc')}> A-Z </button>
        <button className={`${sort ==='desc' ? "actived" : 'Nav-button'}`} onClick={() => handleSort('desc')}> Z-A </button>
        <li className='list_sidebar-li'>
          
          <select className='select-sidebar' name="price" value='Precio' onChange={handlePriceSort}>
            <option id='none' value=''>Filtar por Precio</option>
            <option value="" disabled selected hidden>Precio</option>
            <option id='range1' value='range1'>0 - {maxPrice1}</option>
            <option id='range2' value='range2'>{maxPrice1+1} - {maxPrice2}</option>
            <option id='range3' value='range3'>{maxPrice2+1} - {maxPrice3}</option>
          </select>
        </li>
    
      { rangePrice[1] && <h5>{`${rangePrice[0]} - ${rangePrice[1]}`}</h5> }
      </div>
      <main className='home-main'>
          <section>
            <Filters  onChangeFilter={(e) => { onChangeFilter(e) }} leftFilter={leftFilter} />
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
