import { Button, Icon, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { StoreContext } from '../App'



const Search = ({displaySearch, widthInput, bgColor}) => {

    const {store, dispatch} = useContext(StoreContext)
    const [str, strState] = useState() 
    

    const inputMeals = string => {
        dispatch({type: "SEARCH_PRODUCT", payload: string})
        
    }
  return (
    <InputGroup display={displaySearch} w={widthInput} rounded={"md"} bg={bgColor}>
    <InputLeftElement maxH={"full"} pointerEvents='none'>
      <Icon as={AiOutlineSearch}></Icon>
    </InputLeftElement>
    
    <Input onChange={(e) => strState(e.target.value)} variant={"filled"}  placeholder='Enter the name of the meal' size={"sm"} fontWeight={"600"} rounded={"md"}/>
    <InputRightElement maxH={"100%"} minW={"70px"}>
        <Button onClick={() => inputMeals(str)} variant={"solid"} maxH={"100%"} fontWeight={"600"} fontSize='15px' colorScheme={useColorModeValue("orange", "whatsapp")} roundedLeft={"0"}>
            Search
        </Button>
    </InputRightElement>
    
  </InputGroup>
  )
}

export default Search