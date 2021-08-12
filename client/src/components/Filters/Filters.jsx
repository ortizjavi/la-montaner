import React, {useState} from 'react';
import './Filters.css';

export default function Filters(props) {
 
  const handleFilterStyles = (event) => {
    const data = {[event.target.name]: event.target.value}
    // setFilter(data)
    if( data )  props.onChangeFilter(data)
  }
  return (
    <navigator className="sidebar-container">
        <div className='sidebar-title'>
          <picture>
            <img className='sidebar-img' src="https://live.staticflickr.com/65535/51362991144_97764de6d9_m.jpg" alt="Vaso de Cerveza" />
          </picture>
          <h1>NUESTRAS <br></br> CERVEZAS </h1>
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
                  <option id='Session' value='Session'>Session Ipa</option>
                  <option id='Scotish' value='Scotish'>Scotish (Welcome to Mars)</option>
                  <option id='Milk' value='Milk'>Milk stout</option>
                </select> 
              </li>
                <h5>{Object.values(props.leftFilter)[0]}</h5>
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

          </div>
          <h4 className='sb-h4'>Las mejores cervezas  de <br></br> Cordoba</h4>
    </navigator>
  )
}
