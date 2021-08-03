import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function SearchBar () {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <input type="text" placeholder="Product name"/>
    </div>
  )
}
