import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import './DashTable.css';
import { getProductDetail } from '../../redux/actions/types/productActions';


const Tabla = () =>{ 
  const user = useSelector((state) => state.session.user);

  const [state, setState] = useState('') 
console.log(user.orders?.createdAt?.slice(0,10)) 
  const handleState = e =>{
    const cardOrder = user.orders?.find(o => o._id === e.target.id);
    setState(cardOrder)
  }

  const goBack = () => {
    setState('')
  }

  const ponerFilas = (res) => res?.map( (order, key) => (
        <tr className='dt-tr' key={ order._id }>
          <td>
            {order?.createdAt?.slice(0,10).split('-').reverse().join('/')} 
          </td>
          <td>
            {order?.status}
          </td>
          <td>
            { '$ ' +  order.cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
              }, 0)
            }
          </td>
          <td>
        
              <input type='button' className="eye-solid-icon" id={order._id} value='&#171;' onClick={(e) => handleState(e) } >
                      {/* <FaEye/> */}
              </input >
          </td>
        </tr>
        ))
    
  return (
  <div>
    <h3 className='table-title'>Mis compras</h3>
    { !state ?

      <table className='table'>
          <thead>
              <th>
                  Fecha
              </th>
              <th className='dt-th2'>
                  Estado
              </th>
          
              <th className='dt-th3'>
                  Total
              </th> 
              <th className='dt-th3'>
                  Ver detalles
              </th> 
          </thead>

          <tbody className='dt-tbody'>
              { user.orders && ponerFilas(user.orders)}
          </tbody>
      </table>
      :
      <section>
              {/* <p className='volver' onClick={goBack}>&#x2B05; Volver</p> */}
              <button className='volver' onClick={goBack}>&#x2B05; Volver</button>
              <table className='table'>
                <thead >
                  <th className='dt-th2'>

                  </th>
                  <th>
                    Producto
                  </th>
                  <th className='dt-th2'>
                    Precio
                  </th>
                  <th className='dt-th3'>
                    Cantidad
                  </th>

                </thead>
              <tbody className='dt-tbody'>
                {
                  state.cart?.map( product => (
                    <tr className='dt-tr' key={ product.id }>
                      <td>
                        <NavLink className="" to={`/home/${product.id}`}>
                          <img src={product.image} width='60px'/>
                        </NavLink>
                      </td> 
                      <td>
                        <NavLink className="" to={`/home/${product.id}`}>
                          { product.name}
                        </NavLink>
                      </td>
                      <td>
                        { '$ ' + product.price}
                      </td> 
                      <td>
                        {product.stockSelected}
                      </td>
                    </tr>
                  ))
                }
                <p className='dt-p'>Total: $ {state.cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
              }, 0) }</p>
                <p className='dt-p'>Fecha de compra: {state.createdAt?.slice(0,10).split('-').reverse().join('/')}</p>
                </tbody>
              </table>
      </section>
    }  
  </div>
)};


export default Tabla;

