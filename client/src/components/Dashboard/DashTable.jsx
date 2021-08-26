import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAdminProducts } from '../../redux/actions/types/adminActions';
import './DashTable.css';


const Tabla = () =>{ 
  const user = useSelector((state) => state.session.user);

////// 
  const Products = useSelector( state => state.root.adminProducts)
    
  const dispatch = useDispatch()

  useEffect(() => {
     
      dispatch(getAdminProducts())
  }, [])
  let onlyReviews = Products?.filter(e => e.reviews?.length > 0)
  let thisUserReviews = []
  onlyReviews.map(e => e.reviews.map(el => el.idUsuario === user._id && thisUserReviews.push(e)))
////////

console.log(user.orders.reverse())
  const [state, setState] = useState('') 

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
                return accumulator + (currentValue.price*currentValue.stockSelected);
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
 console.log(state)   
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
                        {
                          state.status === 'Completa' ?
                          thisUserReviews.find(el => el._id === product.id) ? null :
                          <NavLink className="" to={`/home/${product.id}`}>
                            <p className='need-review'>Calificar este producto</p>
                          </NavLink> : null
                        }
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
                return accumulator + (currentValue.price*currentValue.stockSelected);
              }, 0) }</p>
                <p className='dt-p'>Fecha de compra: {state.createdAt?.slice(0,10).split('-').reverse().join('/')}</p>
                <p className='dt-p'>Forma de pago: {state.payment}</p>
                </tbody>
              </table>
      </section>
    }  
  </div>
)};


export default Tabla;

