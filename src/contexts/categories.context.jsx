import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  products: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    //helper async function
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");

      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const prods = { categoriesMap };

  return (
    <CategoriesContext.Provider value={prods}>
      {children}
    </CategoriesContext.Provider>
  );
};
