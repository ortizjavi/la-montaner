import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getOrders } from '../../redux/actions/types/adminActions';
import './DashTable.css';
import { addCartSubTotal } from '../../redux/actions/types/productActions';


const Tabla = () =>{ 

  const dispatch = useDispatch()
  // const orders = useSelector((state) => state.admin.orders);
  const user = useSelector((state) => state.session.user);
  // const response = orders?.filter(o => o.user === user._id);
  const [state, setState] = useState('') 

  // if(!orders.length){
  //     dispatch(getOrders())
  // }
  
  const handleState = e =>{
    const cardOrder = user.orders?.find(o => o._id === e.target.id);
    setState(cardOrder)
    // cardOrder?.cart.map(e => 
    //   console.log('dashTable/card/e ', e.name)
    //   )
  }
  console.log('DashTable/user: ',user)


  const goBack = () => {
    setState('')
  }


  const ponerFilas = (res) => res?.map( (order, key) => (
        <tr className='dt-tr' key={ order._id }>
          <td>
            { order?.createdAt?.slice(0,10)} 
          </td>
          <td>
            { order?.status}
          </td>
            { order.cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
              }, 0)
            }
          <td>
        
              <input type='button' className="eye-solid icon" id={order._id} value='Ver' onClick={(e) => handleState(e) } >
                      {/* <FaEye/> */}
              </input >
          </td>
        </tr>
        ))
    
  return (
  <div>
    { !state ?

      <table className='table'>
          <thead>
              <th>
                  Fecha
              </th>
              <th>
                  Estado
              </th>
          
              <th>
                  Total
              </th> 
          </thead>

          <tbody className='dt-tbody'>
              { ponerFilas(user.orders)}
          </tbody>
      </table>
      :
      <section>
          <div>
              <table className='table'>
                <h4>Detalles</h4>
                  <button onClick={goBack}>Volver</button> 
                <thead >
                  <th></th>
                  <th>
                    Producto
                  </th>

                  <th>
                    Precio
                  </th>
                </thead>
              {/* <tbody className='dt-tbody'> */}
                <tbody className=''>
                {
                  state.cart?.map( product => (
                    <tr className='dt-tr' key={ product.id }>
                      <td>
                        <NavLink className="" to={`/home/${product.id}`}>
                          <img src={product.image} width='20px'/>
                        </NavLink>
                      </td> 
                      <td>
                        <NavLink className="" to={`/home/${product.id}`}>
                          { product.name}
                        </NavLink>
                      </td>
                      <td>
                        { product.price}
                      </td> 
                      <td>
                        {product.stockSelected}
                      </td>
                    </tr>
                  ))
                }
                <p>Total: {state.cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price;
              }, 0) }</p>
                </tbody>
              </table>
          </div>
      </section>
    }  
  </div>
)};


export default Tabla;

