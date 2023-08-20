import React, { createContext, useReducer } from 'react'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Basket from './pages/basket'
import Products from './pages/products'
import { InitialState, reduser } from './store/reduser'

export const StoreContext = createContext()

const App = () => {

  const [store, dispatch] = useReducer(reduser, InitialState)
  

  return (
    
    <StoreContext.Provider value={{store, dispatch}}>
      <Header/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/basket' element={<Basket/>} />
      </Routes>
    </StoreContext.Provider>
    
    
  )
}

export default App