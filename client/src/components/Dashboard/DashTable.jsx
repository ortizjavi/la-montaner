import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getOrders } from '../../redux/actions/types/adminActions';
import './DashTable.css';


const Tabla = () =>{ 
  const dispatch = useDispatch()
  
  const orders = useSelector((state) => state.admin.orders);
  const user = useSelector((state) => state.session.user);
  
  const response = orders?.filter(o => o.user === user._id);
  
  const [state, setState] = useState('') 

  if(!orders.length){
      dispatch(getOrders())
  }

  console.log('dashtable/orders',orders)
  console.log('dashtable/user',user)
  console.log('dashtable/respuesta2',response)
  

  const handleState = e =>{
    const cardo = response?.find(o => o._id === e.target.id);
    setState(cardo)
console.log('dashtable/id',e.target.id)
    cardo?.cart.map(e => 
      console.log('dashTable/card/e ', e.name)
      )
  }


  // const respuesta = orders?.find(o => o.user === user._id);

    const ponerFilas = (res) => res?.map( (orden, key) => (
          <tr className='dt-tr' key={ orden._id }>
            <td>
              { orden?.createdAt} 
            </td>
            <td>
              { orden?.status}
            </td>
           
            <td>
                <input type='button' className="eye-solid icon" id={orden._id} value='Ver' onClick={(e) => handleState(e) } >
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
                { ponerFilas(response)}
            </tbody>
        </table>
                :
                <section>
                <div>

                <table className='table'>
                  <h4>Detalles</h4>
                    {/* <button onClick={setState('')}>Volver</button>  */}
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
                      </tr>
                ))
                }
              
            </tbody>
            </table>

                </div>

                </section>
                }
          
    </div>
)};


export default Tabla;

