
import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './SearchBar.css';
import { getAllProducts } from '../../actions/types';
import{ Link } from 'react-router-dom';

const Search = ()=>{

    const dispatch = useDispatch();
    const allProducts = useSelector( state => state.allProducts)
    const [state, setState] = useState({product: "",})


    useEffect( () => {
       console.log('components/Search/state: ',state.product)
       dispatch(getAllProducts())
      }, [state])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
      }
    const handleSubmit = (event) => {
        event.preventDefault();
        setState({ ...state, product: ""});
    }
    console.log('components/searchBar: allProducts:', allProducts[0])
    return(
        <div>
            
            <form className="form-container" >
              
                    <label  >Buscar Producto: </label>
                    <input className='input_search' name='product' placeholder='Birras' value={state.product} onChange={(e) => handleChange(e)} />
                    <button className={`${!state.product?.length && "disabled"}`} type="button" onClick={(e) => handleSubmit(e)}>Limpiar</button> 
            </form>
            <section className='allproducts'>
                {
                    allProducts?.length && allProducts.filter(item => item.name.includes(state.product)).length ? 
                    allProducts.filter(item => item.name.includes(state.product)).map( item =>
                        <div className='product_container' key={item._id}>
                            <Link className='link' to={`/home/${item?._id}`}>{item?.name}</Link>
                            <br></br>
                            <Link className='link' to={`/home/${item?._id}`}>
                                <picture className='image_contain'>
                                    {/* <img className="item_image" src={item?.image}  alt="Imagen de Birra" /> */}
                                    <img className="item_image" src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"  alt="Imagen de Birra" />
                                </picture>
                            </Link>
                        
                        
                        </div>
                    )
                    :
                        <h2> 😢 No hay productos que coincidan</h2>
                     
                }
            </section>
        </div>
    )
};

export default Search;