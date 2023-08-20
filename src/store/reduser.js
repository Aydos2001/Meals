export const InitialState = {
    inputValue: "Chicken",
    products: [],
    basket:  [],
    isLoading: true,
    error: false
}

export const reduser = (store=InitialState, action) => {
    if(action.type === "FETCHING_PRODUCTS") {
        return {
            ...store,
            isLoading: true,
            
        }
    } else if(action.type === "FETCHED_PRODUCTS") {
        
        return {
            ...store,
            products: action.payload,
            isLoading: false,
            error: false
        }
    } else if(action.type === "FETCHING_ERROR_PRODUCTS") {
        return {
            ...store, 
            isLoading: false,
            error: true
        }
    } else if(action.type === "ADD_TO_CARD") {
        const filterBasket = store.basket.find(item => item.idMeal === action.payload.idMeal)

         if(filterBasket) {
            return store
         } else {
            return {
                ...store,
                basket: [action.payload, ...store.basket]
            }
         }
         
    } else if(action.type === "DELETE_PRODUCT_BASKET") {
        return {
            ...store,
            basket: [...store.basket].filter(item => item.idMeal !== action.payload)
            
        }
        

    } else if(action.type==="SEARCH_PRODUCT") {
        if(store.inputValue !== action.payload) {
            console.log("Hello")
            return {
                ...store,
                products: [],
                inputValue: action.payload
            }
        } else {
            return {
                ...store
            }
        }
    }
    
    else {
        return store
    }
}

// action = {type: "", payload}