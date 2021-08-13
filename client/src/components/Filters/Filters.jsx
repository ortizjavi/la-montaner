import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './Filters.css';
import { selectCategoryAction } from '../../redux/actions/types/productActions.js';
import { IoBeer } from 'react-icons/io5';

export default function Filters(props) {
  const dispatch = useDispatch()
 
  const handleFilterStyles = (event) => {
    const data = {[event.target.name]: event.target.value}
    // setFilter(data)
    if( data )  props.onChangeFilter(data)
  }
  return (
    <navigator className="sidebar-container">
        <div className='sidebar-title'>
          {/* <picture>
            <img className='sidebar-img' src="https://live.staticflickr.com/65535/51362991144_97764de6d9_m.jpg" alt="Vaso de Cerveza" />
          </picture> */}
          <h1><IoBeer/> NUESTRAS <br></br> CERVEZAS... </h1>
        </div>
          <div>
            <ul className="list-sidebar">
              <li className='list_sidebar-li'>
                <select className='select-sidebar' value='Estilos' name="estilos" onChange={handleFilterStyles}>
                  <option id='none' value='none'>Todos los estilos</option>
                  <option value="" disabled selected hidden>Estilos de cerveza</option>
                  <option id='American' value='American'>American west coast IPA</option>
                  <option id='Golden' value='Golden'>Golden Ale</option>
                  <option id='Honey' value='Honey'>Honey Beer</option>
                  <option id='Session' value='Session'>Session IPA</option>
                  <option id='Scotish' value='Scotish'>Scotish (Welcome to Mars)</option>
                  <option id='Milk' value='Milk'>Milk Stout</option>
                </select> 
              </li>
              <li className='list_sidebar-li'>
                <select className='select-sidebar' value='Volumen' name="volumen"  onChange={handleFilterStyles}>
                  <option id='none' value='none'>Todos los Volumenes</option>
                  <option value="" disabled selected hidden>Volumen</option>
                  <option id='0.5' value='0.5'>500 ml</option>
                  <option id='1' value='1'>1 litro</option>
                  <option id='20' value='20'>20 litros</option>
                  <option id='50' value='50'>50 litros</option>
                </select>
              </li>
            </ul>
            {
              // Object.values(props.leftFilter)[0] ?
              Object.values(props.leftFilter)[0] === 'American' ?  <h5>American west coast IPA</h5> :
              Object.values(props.leftFilter)[0] === 'Golden' ?  <h5>Golden Ale</h5> :
              Object.values(props.leftFilter)[0] === 'Honey' ?  <h5>Honey Beer</h5> :
              Object.values(props.leftFilter)[0] === 'Session' ?  <h5>Session IPA</h5> :
              Object.values(props.leftFilter)[0] === 'Scotish' ?  <h5>Scotish</h5> :
              Object.values(props.leftFilter)[0] === 'Milk' ? <h5>Milk Stout</h5> :
              Object.values(props.leftFilter)[0] === '0.5' ? <h5>500 ml</h5> :
              Object.values(props.leftFilter)[0] === '1' ? <h5>1 litro</h5> :
              Object.values(props.leftFilter)[0] === '20' ? <h5>20 litros</h5> :
              Object.values(props.leftFilter)[0] === '20' ? <h5>50 litros</h5> :
              <h5>...</h5>
            }
            {/* <h5 className='filter-result'>{Object.values(props.leftFilter)[0]}</h5> */}
            <button className='sidebar-buton' onClick={() => dispatch(selectCategoryAction(''))}>Borrar Filtros</button>
          </div>
          <h4 className='sb-h4'>Las mejores cervezas  de <br></br> Cordoba</h4>
    </navigator>
  )
}
