import { Box, Button, Flex, HStack, Heading, Icon, useColorMode, useColorModeValue, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiSun, BiMoon} from "react-icons/bi"
import { StoreContext } from '../App'
import Search from './search'

const Header = () => {
    const {pathname} = useLocation()
    const { colorMode, toggleColorMode } = useColorMode()

    const {store} = useContext(StoreContext)

  return (
    <Box w={"full"} position={"sticky"} top={"0"} left={"0"} borderBottom={"1px"} zIndex={"9"} bg={useColorModeValue("gray.500", "gray.700")} pb={{base: "2px", md: "0"}}>
        <Flex
        zIndex={"9"}
        gap={"10px"}
        shadow={"md"}
        justify={"space-between"}
        alignItems={"center"} 
        px={"5%"} py={{base: "2px", sm: "5px", md: "10px"}} 
        bg={useColorModeValue("gray.200", "gray.900")} 
        borderBottom={"1px"} 
        borderColor={useColorModeValue("gray.300", "gray.500")}
        
        >   <Heading fontSize={{base: "20px", sm: "22px", md: "25px"}} color={useColorModeValue("orange.600", "white")}>Meals</Heading>
            <Search displaySearch={{base: "none", md: "block"}} widthInput={"50%"}/>
            <HStack spacing={{base: "20px", sm: "30px", md: "40px"}}>
                <Button  colorScheme="blackAlpha.500" variant={"link"} _active={{color: "blue.500"}} isActive={pathname==="/"? true : false}><Link to={"/"}>Products</Link></Button>
                <HStack>
                <Button  colorScheme="blackAlpha.500" variant={"link"} _active={{color: "blue.500"}} isActive={pathname==="/basket"? true : false}><Link to={"/basket"}>Basket</Link></Button>
                <Text bgColor={"orange.500"} rounded={"full"} px={"7px"} fontWeight={"800"} lineHeight={"22px"} color={"white"}>{store.basket.length}</Text>
                </HStack>
                <Button bg={"blackAlpha.200"} variant={"ghost"} onClick={toggleColorMode} rounded={"full"} width={"20px"}>
                    <Icon as={colorMode === "light"? BiMoon: BiSun}></Icon>
                </Button>
            </HStack>
        </Flex>
        <Flex justify={"center"} alignItems={"center"} w={"90%"} mx="auto" my="5px" display={{base: "block", md: "none"}}>
            <Search bgColor={useColorModeValue("white", "blackAlpha.700")}/>
        </Flex>
    </Box>
  )
}

export default Header