import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [favoriler, setFavoriler] = useState([]);
  const [sepet, setSepet] = useState([]);
  const [quantities, setQuantities] = useState({});

  const favorilereEkle = (product) => {
    const eskiFavoriler = [...favoriler];
    const yeniFavoriler = eskiFavoriler.concat(product);

    setFavoriler(yeniFavoriler);
  };

  const favorilerdenCikar = (id) => {
    const eskiFavoriler = [...favoriler];
    const yeniFavoriler = eskiFavoriler.filter((urun) => urun.id !== id);

    setFavoriler(yeniFavoriler);
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({ ...prev, [itemId]: parseInt(value) }));
  };

  function sepeteEkle(item) {
    const existingItemIndex = sepet.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex > -1) {
      const newCart = [...sepet];
      newCart[existingItemIndex].quantity += quantities[item.id] || 1;
      setSepet(newCart);
    } else {
      item.quantity = quantities[item.id] || 1;
      setSepet((prevCart) => [...prevCart, item]);
    }
  }

  const sepettenCikar = (id) => {
    const sepettekiler = [...sepet];
    const urunIndex = sepettekiler.findIndex((item) => item.id === id);
    if (urunIndex > -1) {
      sepettekiler.splice(urunIndex, 1);
      setSepet(sepettekiler);
    }
  };

  const totalItemsInCart = sepet.reduce((acc, item) => acc + item.quantity, 0);
  const toplam = sepet.reduce((acc, products) => acc + products.price, 0);

  return (
    <AppContext.Provider
      value={{
        favoriler,
        favorilereEkle,
        favorilerdenCikar,
        sepet,
        sepeteEkle,
        sepettenCikar,
        toplam,
        quantities,
        handleQuantityChange,
        totalItemsInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
