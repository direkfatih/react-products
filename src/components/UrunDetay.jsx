import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/GlobalContext";

function UrunDetay() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { favoriler } = useContext(AppContext);
  const favoriKontrol = (x) => {
    const secim = favoriler.some((product) => product.id === x);
    return secim;
  };
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    console.log(favoriKontrol(id));
  }, []);

  return (
    <div>
      <div className="container">
        <h2 className="display-2">{products.title}</h2>
        <div className="row my-4">
          <div className="col-md-4">
            <div>
              {favoriKontrol(products.id) ? (
                <button className="btn btn-danger mb-2">
                  Favorilerinizde Bulunmaktadır
                </button>
              ) : (
                <div className="div"></div>
              )}
            </div>
            <img
              src={products.thumbnail}
              alt={products.title}
              style={{ height: "300px", width: "600px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-8">
            <h2>Marka: {products.brand}</h2>
            <h4 className="mt-2">Kategori: {products.category}</h4>
            <h3 className="mt-5">Ürün Hakkında</h3>
            <p>{products.description}</p>
            <h4 className="mt-5">Fiyat: {products.price} $</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrunDetay;
