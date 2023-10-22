import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../API";
import { AppContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function UrunListesi() {
  const [products, setProducts] = useState([]);

  const { favoriler, favorilereEkle, favorilerdenCikar } =
    useContext(AppContext);

  const favoriKontrol = (x) => {
    const secim = favoriler.some((product) => product.id === x);
    return secim;
  };

  const { sepet, sepeteEkle } = useContext(AppContext);
  const { quantities, handleQuantityChange } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 my-3">
              <div
                className="card m-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                style={{ width: "25rem", height: "460px" }}
              >
                <img
                  src={product.thumbnail}
                  alt=""
                  className="card-img-top m-auto"
                  style={{ cursor: "pointer", height: "280px" }}
                  onClick={() => navigate(`urundetay/${product.id}`)}
                />
                <div className="card-body">
                  <h6 className="card-title">{product.title}</h6>
                  <p className="card-text">Fiyat: {product.price}$</p>
                  <div className="row" style={{ marginLeft: "83px" }}>
                    <div
                      className="col-md-2"
                      style={{
                        marginTop: "5px",
                        marginRight: "-2px",
                        marginLeft: "-25px",
                      }}
                    >
                      {favoriKontrol(product.id) ? (
                        <svg
                          cursor={"pointer"}
                          onClick={() => favorilerdenCikar(product.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          height="2em"
                          viewBox="0 0 4321 512"
                        >
                          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                        </svg>
                      ) : (
                        <svg
                          cursor={"pointer"}
                          onClick={() => favorilereEkle(product)}
                          xmlns="http://www.w3.org/2000/svg"
                          height="2em"
                          viewBox="0 0 4321 512"
                        >
                          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="col-md-10">
                      <button
                        style={{ width: "110px", height: "40px" }}
                        cursor={"pointer"}
                        onClick={() => sepeteEkle(product)}
                        className="btn btn-danger"
                      >
                        Sepete Ekle
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantities[product.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        className="p-2 border rounded"
                        style={{ fontSize: "10px", width: "50px", height:"42px"}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UrunListesi;
