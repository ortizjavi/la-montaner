import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './SearchBar.css';
import { getAllProducts } from '../../actions/types/productActions';
import { Link } from 'react-router-dom';
import Pagination from './Pagination/Pagination';

export default function Search() {
  const dispatch = useDispatch();
  const allProducts = useSelector( state => state.allProducts)
  const [state, setState] = useState({product: ""})
  useEffect(() => {
    dispatch(getAllProducts(state.product))
  }, [state])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
     }

    const handleSubmit = (event) => {
        event.preventDefault();
        setState({product: ""});
    }
    
    return(
        <div>
            <form className="form-container" >
                <label>     
                    <input list="product" multiple value={state.product} className='input_search' autoComplete='off' placeholder='Buscar Productos' name="product" onChange={handleChange} />  
                </label>   
                <datalist  id="product" multiple  >
                    {
                        state.product.length >=2 ?
                        allProducts?.map( (t, key) => (
                            <option key={key} value={t.name} />  
                        ))
                        :
                            <option/>
                    }  
                </datalist>
                <button className={`${!state.product?.length && "disabled"}`} type="button" onClick={(e) => handleSubmit(e)}>Limpiar</button> 
            </form>

            <section className="items-container">
            {
                allProducts.length > 0 ?
                allProducts.length < 9 ?
                allProducts.map( item =>
                    <div className='product_container' key={item._id}>
                        <Link className='link' to={`/home/${item?._id}`}>{item?.name}</Link>
                            <br></br>
                            <Link className='' to={`/home/${item?._id}`}>
                                <picture className='image_contain'>
                                    <img className="item_image" src={item?.img} placeholder="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg" alt="Imagen de Birra" />
                                    {/* <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"  alt="Imagen de Birra" /> */}
                                </picture>
                        </Link>
                    </div>
                )
                :
                    <Pagination response={allProducts}/>
                :
                    <h2> 😢 No hay productos que coincidan</h2>
            }
            </section>
        </div>
    );
};

     
