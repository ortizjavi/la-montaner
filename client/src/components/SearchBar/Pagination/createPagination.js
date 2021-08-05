const createPagination = params => {
    const {
      numberOfArticles,
      articlesPerPage,
      currentPage,
      numberOfButtons
    } = params;
  
    const numberOfPages = Math.ceil(numberOfArticles / articlesPerPage);
  
    if (currentPage > numberOfPages || currentPage < 1)
      return {
        pagination: [],
        currentPage
      };
  
    const buttons = Array(numberOfPages)
      .fill(1)
      .map((e, i) => e + i);
    const sideButtons =
      numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2;
  
    const calculLeft = (rest = 0) => {
      return {
        array: buttons
          .slice(0, currentPage - 1)
          .reverse()
          .slice(0, sideButtons + rest)
          .reverse(),
        rest: function() {
          return sideButtons - this.array.length;
        }
      };
    };
  
    const calculRight = (rest = 0) => {
      return {
        array: buttons.slice(currentPage).slice(0, sideButtons + rest),
        rest: function() {
          return sideButtons - this.array.length;
        }
      };
    };
  
    const leftButtons = calculLeft(calculRight().rest()).array;
    const rightButtons = calculRight(calculLeft().rest()).array;
  
    return {
      pagination: [...leftButtons, currentPage, ...rightButtons],
      currentPage
    };
  };
  
  export default createPagination;