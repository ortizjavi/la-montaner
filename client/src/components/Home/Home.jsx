import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  searchProducts, filterProducts, getMaximumPrice, filterByPrice, selectCategoryAction,currentPageAction,searchProductsAction } from '../../redux/actions/types/productActions.js';
import Filters from '../Filters/Filters.jsx';
import ShowProducts from '../ShowProducts/ShowProducts';
import './Home.css';
import ClearIcon from '@material-ui/icons/Clear';
import SortIcon from '@material-ui/icons/Sort';



export default function Home() {

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.root.currentPage)
  const searchState = useSelector(state => state.root.searchProdustsState)
  const allProducts = useSelector( state => state.root.allProducts)
  const currentCategoryState = useSelector( state => state.root.currentCategoryState)
  const maxPrice3 = useSelector(state => state.root.maxPrice)
  const [rangePrice, setRangePrice] = useState('')
  const [leftFilter, setLeftFilter] = useState('')

  const [sort, setSort] = useState('asc')
  const maxPrice1 = Math.ceil(maxPrice3 * (1/3))
  const maxPrice2 = Math.ceil(maxPrice3 * (2/3))
  
  useEffect(()=>{
    let param = {sort, pageNumber: 0, name: searchState, category:currentCategoryState }
    dispatch(searchProducts(param))
    dispatch(getMaximumPrice('price'))
  },[dispatch])

  useEffect(()=>{
    setRangePrice('')
    setLeftFilter('') 
    // setSort('')
    if(currentCategoryState !== 'vertodos') dispatch(searchProductsAction(''))
    let param = {sort, pageNumber: 0, name: searchState, category:currentCategoryState }
    dispatch(currentPageAction(1))    
    const act =() => dispatch(searchProducts(param))
    act()
  },[currentCategoryState])

  useEffect(() => {
      if(leftFilter) return dispatch(filterProducts(leftFilter, sort, currentPage-1))
      if(rangePrice){
      return dispatch(filterByPrice(sort, rangePrice, currentPage-1))
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
    // setSort('')
    if(searchState.length>=2){
      dispatch(selectCategoryAction('vertodos'))
      let param = {sort, pageNumber: currentPage-1, name: searchState, category:'vertodos' }
      dispatch(searchProducts(param))
      } else{
      let param = {sort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
    dispatch(searchProducts(param))
    }
  },[searchState])

  
  const onChangeFilter = (data) => {
    setRangePrice('')
    dispatch(currentPageAction(1))
    setLeftFilter(data)
    if(Object.values(data)[0] === 'none'){
      let param = {sort, pageNumber: currentPage-1, name:'', category:currentCategoryState }
      dispatch(searchProducts(param))
    }else{
      dispatch(filterProducts(data, sort, 0))
    }
  }


  
  const handleSort = (paramsort) => {
    setLeftFilter('')
    setSort(paramsort)
  }

  const handlePriceSort = (e) => {
    setLeftFilter('')
    let range = []
    if(e.target.value === 'todos') range = [0, maxPrice3]
    if(e.target.value === 'range1') range = [0, maxPrice1]
    if(e.target.value === 'range2') range = [maxPrice1+1, maxPrice2] 
    if(e.target.value === 'range3') range = [maxPrice2+1, maxPrice3]
    setRangePrice(range)
  }

  const triggerFilter = () => {
    // currentCategoryState !== 'vertodos' ? window.location.reload() :
    // setLeftFilter('')
    // console.log('currentPage: ', currentPage)
    (rangePrice && currentCategoryState === 'vertodos') ? dispatch(filterByPrice(sort, rangePrice, 0)) : dispatch(searchProducts({sort, pageNumber: currentPage-1, name:'', category:currentCategoryState} ))
    dispatch(currentPageAction(1));
  }

  return (
    <div>
      {
        currentCategoryState === 'vertodos' ?
        <div className='Home-filter'>
          <button className={`${sort ==='asc' ? "actived" : 'home-button'}`} onClick={() => handleSort('asc')}> A-Z </button>
          <button className={`${sort ==='desc' ? "actived" : 'home-button'}`} onClick={() => handleSort('desc')}> Z-A </button>
          <li className='home-list'>
            <select className='select-home' id='select' name="select" onClick={(e) =>handlePriceSort(e)}>
              <option id='todos'  value='todos'>Todos los precios</option>
              <option id='range1'  value='range1'>Precio entre: $0 - ${maxPrice1}</option>
              <option id='range2' value='range2'>Precio entre: ${maxPrice1+1} - ${maxPrice2}</option>
              <option id='range3' value='range3'>Precio entre: ${maxPrice2+1} - ${maxPrice3}</option>
            </select>
          </li>
          <button onClick={triggerFilter}><SortIcon /></button>
      </div> : 
       <div className='Home-filter'></div>
      }
      <main className='home-main'>
          <section>
            {
              currentCategoryState ==='cervezas' ?
              <Filters  onChangeFilter={(e) => { onChangeFilter(e) }} leftFilter={leftFilter} />
              :
              <div className="home-sidebar-container">
                <picture>
                  <img className='home-img' src="https://res.cloudinary.com/la-montanes/image/upload/v1629064219/sideBar_1_lvi8gq.png" alt="Vaso de Cerveza" />
                </picture>
               
              </div>
            }
          </section>
          <section className="items-container">
            <ShowProducts allProducts={allProducts}/>
          </section>
      </main>
    </div>
  )
}
