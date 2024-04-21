import { createContext, useState } from "react";

import Products from '../shop-data.json'


export const ProductsContext = createContext({
    products: []
})
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(Products)
    const prods = {products, setProducts}


    return <ProductsContext.Provider value={prods}>{children}</ProductsContext.Provider>
}