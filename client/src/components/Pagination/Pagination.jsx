import React, {useEffect} from "react";
import { useDispatch} from "react-redux"

import createPagination from "./createPagination";
import {currentPageAction} from "../../actions/types/productActions";
import "./Pagination.css";

export default function Pagination({response}) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = React.useState(1);
  useEffect(()=>{
    dispatch(currentPageAction(currentPage))    
  },[currentPage])

  const { pagination } = createPagination({
    numberOfArticles: response,
    articlesPerPage: 8,
    numberOfButtons: 8,
    currentPage
  });


  const handleClick = page => setCurrentPage(page);
  return (
    
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          Anterior
        </li>
        {pagination.map(page => (
          <li
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          Siguiente
        </li>
      </ul>
    </div>
    
  );
}
