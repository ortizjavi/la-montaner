import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import createPagination from './createPagination';
import { currentPageAction } from '../../redux/actions/types/productActions';
import './Pagination.css';

export default function Pagination({ response }) {
  const dispatch = useDispatch();
  const currentInit = useSelector((state) => state.root.currentPage);
  const currentCategoryState = useSelector(
    (state) => state.root.currentCategoryState,
  );

  const [currentPage, setCurrentPage] = React.useState(currentInit);
  // const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    setCurrentPage(currentInit);
  }, [currentInit]);

  useEffect(() => {
    dispatch(currentPageAction(currentPage));
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategoryState]);

  const { pagination } = createPagination({
    numberOfArticles: response,
    articlesPerPage: 8,
    numberOfButtons: 8,
    currentPage,
  });

  const handleClick = (page) => setCurrentPage(page);

  return (
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage - 1)}
        >
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </li>
        {pagination.map((page) => (
          <li
            key={page}
            className={`${currentPage === page && 'active-p'}`}
            onClick={handleClick.bind(null, page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && 'disabled'}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </li>
      </ul>
    </div>
  );
}
