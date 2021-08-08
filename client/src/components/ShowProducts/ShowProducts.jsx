import React from 'react';
import{ NavLink } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading.js';
import './ShowProducts.css'


const ShowProducts = ({allProducts}) => {

  const articlesPerPage=8;
  const diff = articlesPerPage - allProducts[0]%articlesPerPage;

  if(diff && allProducts[1].length<8){
    const newElements = Array(diff).fill({})
    for(let i = 0; i < diff; i++){
      allProducts[1].push({
        _id: i,
        img: ["https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"],
        name: 'Cerveza en Proceso de Creación'
      })
    }
  }

  function validaURLs(url) {
    var re=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;
    return re.test(url);
    }

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
                                    {
                                     validaURLs(item.img[0]) ?
                                      <img className="item_image" src={item?.img[0]} alt="" />
                                      :
                                      <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg" alt="" />

                                    }
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