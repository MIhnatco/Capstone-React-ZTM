import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../routes/categories-preview/categories-preview.component";
import Category from "../routes/category/category.component";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { setCategories } from "../store/categories/categories.action";
import "./shop.styles.scss";
import { useEffect } from "react";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategorieMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };

    getCategorieMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
