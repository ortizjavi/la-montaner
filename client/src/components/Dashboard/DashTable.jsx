import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getOrders } from '../../redux/actions/types/adminActions';
import './DashTable.css';


const Tabla = () =>{ 
  const dispatch = useDispatch()

  const ordenes = useSelector((state) => state.admin.orders);

  if(!ordenes){
      dispatch(getOrders())
  }
  // const respuesta = ordenes?.find(o => o.user === usuario._id);

    const ponerFilas = () => ordenes?.map( (orden, key) => (
          <tr className='dt-tr' key={ orden._id }>
            <td>
              { orden.cart[0].name}
            </td>
            <td>
              { orden.createdAt}
            </td>
            <td>
              { orden.status}
            </td>
            <td>
              {/* { orden.pay} */}
            </td>
            <td>
              {/* { orden.send} */}
            </td>
            <td>
              {/* { orden.total} */}
            </td>
            <td>
                <Link to={ `/dashboard` }>
                    <div className="eye-solid icon">
                        <FaEye/>
                    </div>
                </Link>
            </td>
          </tr>
          ))
      
    return (
    <div>
        <table className='table'>
            <thead>
                <th>
                    Orden
                </th>
                <th>
                    Fecha
                </th>
                <th>
                    Estado
                </th>
                {/* <th>
                    Pago
                </th>
                <th>
                    Envío
                </th>
                <th>
                    Total
                </th> */}
            </thead>
            <tbody className='dt-tbody'>
                { ponerFilas() }
            </tbody>
        </table>
    </div>
)};


export default Tabla;