import React from "react";
import{ Link } from 'react-router-dom';

import createPagination from "./createPagination";
import "./Pagination.css";

export default function Pagination({response}) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { pagination } = createPagination({
    numberOfArticles: response,
    articlesPerPage: 8,
    numberOfButtons: 8,
    currentPage
  });

  console.log( 'response', response)

  const handleClick = page => setCurrentPage(page);
  // let products =response.slice((currentPage-1)*8, (currentPage-1)*8+8)
  return (
    <>  
    {/* <ul className='container'>
      {
          products.length > 0 ?
          products.map( item =>
              <div className='product_container' key={item._id}>
                <Link className='link' to={`/home/${item?._id}`}>{item?.name}</Link>
                <br></br>
                <Link className='' to={`/home/${item?._id}`}>
                  <picture className='image_contain'>
                      <img className="item_image" src={item?.img} placeholder="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg" alt="Imagen de Birra" />
                      {/* <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"  alt="Imagen de Birra" /> */}
                  {/* </picture>
                </Link> 
              </div>
          )
          :
              <h2> 😢 No hay productos que coincidan</h2>               
      }
    </ul> */} 
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Anterior
        </li>
        {pagination.map(page => (
          <li
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Siguiente
        </li>
      </ul>
    </div>
    </>
  );
}
