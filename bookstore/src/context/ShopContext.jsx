import React,{createContext} from "react";
import data from '../assets/data'

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const contextValue = {data}
}
