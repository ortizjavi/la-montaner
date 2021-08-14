import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';


const Tabla = (props) =>{ 

    const ponerFilas = () => props.usuarios.map( (orden, key) => (
          <tr key={ orden.id }>
            <td>
              { orden.name}
            </td>
            <td>
              { orden.date}
            </td>
            <td>
              { orden.state}
            </td>
            <td>
              { orden.pay}
            </td>
            <td>
              { orden.send}
            </td>
            <td>
              { orden.total}
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
                <th>
                    Pago
                </th>
                <th>
                    Envío
                </th>
                <th>
                    Total
                </th>
            </thead>
            <tbody>
                {/* { ponerFilas() } */}
            </tbody>
        </table>
    </div>
)};


export default Tabla;