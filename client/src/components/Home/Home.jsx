import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{ Link } from 'react-router-dom';
import { getAllProducts, searchProducts } from '../../actions/types/productActions.js';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading.js';

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const allProducts = useSelector( state => state.allProducts)

  useEffect(() => {
    dispatch(searchProducts(0));
    setTimeout(() => {
			setLoading(false);
		}, 2000);
  }, [])
  
  console.log('allProducts', allProducts)
  
  return (
    <div>
      <SearchBar/>
      <div>
          <section className="items-container">
            { loading ? (
              <Loading />
               ):
                allProducts.length ?
                allProducts[1].length > 0 ?
                allProducts[1].map( item =>
                    <div className='product_container' key={item._id}>
                        <Link className='link' to={`/home/${item?._id}`}>{item?.name}</Link>
                            <br></br>
                            <Link className='' to={`/home/${item?._id}`}>
                                <picture className='image_contain'>
                                    <img className="item_image" src={item?.img} alt="Imagen de Birra" />
                                    {/* <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"  alt="Imagen de Birra" /> */}
                                </picture>
                        </Link>
                    </div>
                )
                :
                  // allProducts[0] ?
                  <Pagination response={allProducts[0]}/>
                :
                    <h2> 😢 No hay productos que coincidan</h2>
            }
          </section>
      </div>
    </div>
  )
}
