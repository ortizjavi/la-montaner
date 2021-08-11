import React from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading.js";
import "./ShowProducts.css";


const ShowProducts = ({allProducts}) => {

  const articlesPerPage=8;
  const diff = articlesPerPage - allProducts[0]%articlesPerPage;

  if(diff && allProducts[1].length<8){
    for(let i = 0; i < diff; i++){
      allProducts[1].push({
        _id: i,
        img: [],
        name: "Producto en Proceso de Creación",
        noExist: true,
      });
    }
  }

  function validaURLs(url) {
    var re =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;
    return re.test(url);
  }

  return (
    <>
      {allProducts.length ? (
        allProducts[0] > 0 ? (
          <>
            {allProducts[1].map((item) => (
              <>
                {item.noExist ? (
                  <div className="sp-product_container" key={item._id}>
                    <div className="sp-link sp-name">
                      <h5 className="link-name">
                        Producto en Proceso de Creación
                      </h5>
                    </div>
                    <div>
                      <div className="image_contain">
                        <img
                          className="item_image"
                          style={{ opacity: 0.1 }}
                          src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="sp-product_container" key={item._id}>
                    
                    <NavLink className="" to={`/home/${item?._id}`}>
                      <div className="image_contain">
                        {validaURLs(item.img[0]) ? (
                          <img
                            className="item_image"
                            src={item?.img[0]}
                            alt=""
                          />
                        ) : (
                          <img
                            className="item_image"
                            style={{ opacity: 0.1 }}
                            src="https://live.staticflickr.com/65535/51357138820_5d67c34fa6_m.jpg"
                            alt="Producto"
                            onError="this.style.display='none'"
                          />
                        )}

                      </div>
                        <hr></hr>
                        <h5 className="link-name">{item?.name}</h5>
                        <h4 className="item_price">${item?.price}</h4>
                      {
                        item.stock > 0 ? 
                        (<h6 className='sp-h6'>Tenemos en stock!</h6>)
                        : (<h6 className='sp-h6'>No tenemos stock</h6>)
                      }
                    </NavLink>
                    <button
                      className="sp-button"
                      onClick={() => alert("Buena desición")}
                    >
                      Comprar
                    </button>
                  </div>
                )}
              </>
            ))}
            {allProducts[0] > 8 && <Pagination response={allProducts[0]} />}
          </>
        ) : (
          <h2> 😢 No hay productos que coincidan</h2>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ShowProducts;
