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
          <h1><IoBeer/> NUESTRAS <br></br>CERVEZAS... </h1>
        </div>
        <div className='container-select-result'>
        
          <ul className="list-sidebar">
            <li className='list_sidebar-li'>
              <select className='select-sidebar' value='Estilos' name="estilos" onChange={handleFilterStyles}>
                <option id='none' value='none'>Estilos</option>
                {/* <option value="" disabled selected hidden>Estilos de cerveza</option> */}
                <option id='American' value='American'>American west coast IPA</option>
                <option id='Golden' value='Golden'>Golden Ale</option>
                <option id='Honey' value='Honey'>Honey Beer</option>
                <option id='Session' value='Session'>Session IPA</option>
                <option id='Scotish' value='Scotish'>Scotish (Welcome to Mars)</option>
                <option id='Milk' value='Milk'>Milk Stout</option>
              </select> 
            </li>
            {
            Object.values(props.leftFilter)[0] === 'American' ?  <p>Estilo: American west coast IPA</p> :
            Object.values(props.leftFilter)[0] === 'Golden' ?  <p>Estilo: Golden Ale</p> :
            Object.values(props.leftFilter)[0] === 'Honey' ?  <p>Estilo: Honey Beer</p> :
            Object.values(props.leftFilter)[0] === 'Session' ?  <p>Estilo: Session IPA</p> :
            Object.values(props.leftFilter)[0] === 'Scotish' ?  <p>Estilo: Scotish</p> :
            Object.values(props.leftFilter)[0] === 'Milk' ? <p>Estilo: Milk Stout</p> :
            <p></p>
          }
            <li className='list_sidebar-li'>
              <select className='select-sidebar' value='Volumen' name="volumen"  onChange={handleFilterStyles}>
                <option id='none' value='none'>Volumen</option>
                {/* <option value="" disabled selected hidden>Volumen</option> */}
                <option id='0.5' value='0.5'>500 cc</option>
                <option id='1' value='1'>1 litro</option>
                <option id='20' value='20'>20 litros</option>
                <option id='50' value='50'>50 litros</option>
              </select>
            </li>
            {
            // Object.values(props.leftFilter)[0] ?
            
            Object.values(props.leftFilter)[0] === '0.5' ? <p>Volumen: 500 cc</p> :
            Object.values(props.leftFilter)[0] === '1' ? <p>Volumen: 1 litro</p> :
            Object.values(props.leftFilter)[0] === '20' ? <p>Volumen: 20 litros</p> :
            Object.values(props.leftFilter)[0] === '20' ? <p>Volumen: 50 litros</p> :
            <p></p>
          }
          </ul>
          
          {/* <h5 className='filter-result'>{Object.values(props.leftFilter)[0]}</h5> */}
          {/* <button className='sidebar-buton' onClick={() => dispatch(selectCategoryAction(''))}>Borrar Filtros</button> */}
        </div>
        <h4 className='sb-h4'>Las mejores cervezas  de <br></br> Cordoba</h4>
   </navigator>
  )
}
