import {useEffect, useState} from 'react';
import axios from 'axios';
import { GET_PRODUCTS_ENDPOINT  } from '../../constants';

export const UseGetProducts = () =>{
    const [data, setData] = useState([])

    useEffect( () => {
        const getData = async () => {
            const response = await axios.get(`${GET_PRODUCTS_ENDPOINT}`);
            const data = await response.data
            setData(data)
        }
        getData()
    }, []);

    return[data]
}
