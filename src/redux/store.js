import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "../redux/cartRedux"

export default configureStore({
    reducer:{
        cart:cartReducer,
    },
    
})