import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../App'
import axios from 'axios'
import { Card, CardBody, GridItem, useToast, Box, Grid, Image, useColorModeValue, Heading, Button, Icon, Text, HStack, Divider, Spinner, Flex } from '@chakra-ui/react'
import { BsFillBasket2Fill } from "react-icons/bs"
import { TbCloudQuestion } from "react-icons/tb"
import { Link } from 'react-router-dom'

const Products = () => {
  
  const {store, dispatch} = useContext(StoreContext)

  const fetchAllPraducts = (category) => {
    dispatch({type: "FETCHING_PRODUCTS"})
    axios.get(`https:/www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     .then((res) => {
      if(res.data.meals) {
        dispatch({type: "FETCHED_PRODUCTS", payload: res.data.meals})
      } else {
        dispatch({type: "FETCHING_ERROR_PRODUCTS"})
      }
      
     })
     .catch(() => {
      dispatch({type: "FETCHING_ERROR_PRODUCTS"})
     })
  }
  
  useEffect(() => { 
    fetchAllPraducts(store.inputValue)
  }, [store.inputValue])
  
  
  const cardBg = useColorModeValue("blackAlpha.200", "blackAlpha.500")
  const cardBorder = useColorModeValue("blackAlpha.300", "grey")
  const cardBgHover = useColorModeValue("blackAlpha.300", "gray.800")
  const fakeArray = [1,2,3,4,5,6,7,8,10,11,12,13]
  const toast = useToast()

  const addToCard = product => {
    dispatch({type: "ADD_TO_CARD", payload: product})
    toast({
      title: 'The product has been added to the basket',
      status: 'success',
      duration: 2000,
      position: "bottom-left",
    })
  }

  return (
    <Box w={{base: "90%", sm: "85%", md: "80%"}} mx="auto" my="20px" maxW={"1200px"}>
      <Box w="full" bg={cardBg} border={"1px"} borderColor={cardBorder} rounded={"sm"} px={"10px"} py={{base: "10px", sm: "12px", md: "15px"}} my={"10px"}>
       <Heading fontSize={{base: "20px", sm: "23px", md: "25px"}}>Products</Heading>
       <Text fontSize={{base: "12px", sm: "13px", md: "15px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, dignissimos!</Text>
      </Box>
      {store.error === true? 
      (<Box w={"full"} minH={"70vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"20px"}>
      <Icon fontSize={{base: "20px", sm: "30px", md: "40px"}} as={TbCloudQuestion}></Icon>
      <Text fontSize={{base: "10px", sm: "15px", md: "20px"}}>No information was found for the food you entered</Text>
      </Box>) 
      : 
      (<Grid gridTemplateColumns={{
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr"
      }} gap={"10px"}>
        {(store.isLoading === true && store.products.length === 0 && store.error === false)? 
        
        fakeArray.map(item => (
          <GridItem key={item}>
          <Card rounded={"sm"} border={"1px"} bg={cardBg} borderColor={cardBorder} minH="full" _hover={{bg: cardBgHover}}>
            <CardBody p={"10px"} display={"flex"} justifyContent={"space-between"} alignItems={"start"} flexDirection={"column"} gap="10px">
              <Flex h={"350px"} w="full" justify={"center"} alignItems={"center"}>
               <Spinner color='blue' size={"lg"}/>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        ))
        
        : 
        
        
        store?.products?.map(item => (
          <GridItem key={item.idMeal}>
          <Card rounded={"sm"} border={"1px"} bg={cardBg} borderColor={cardBorder} minH="full" _hover={{bg: cardBgHover}}>
            <CardBody minH={"350px"} p={"10px"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"} gap="10px">
              <Box w="full" flex={"4"} display={"flex"} justifyContent={"end"} flexDirection={"column"}>
                <Image flex="4"  rounded={"sm"} src={item.strMealThumb} objectFit={"cover"} minH={"250px"}></Image>
                <Heading my={"5px"} flex={"1"} fontSize={"18px"} fontWeight={"600"}>{item.strMeal}</Heading>
              </Box>
              <Box w={"full"} flex={"1"} textAlign={"end"}>
                <Divider bg={cardBorder} h={"1px"} mb={"10px"}/>
                {
                  store.basket.find(basketItem => (
                    basketItem.idMeal === item.idMeal
                 ))? 
                  (<Link to="/basket">
                  <Button variant={"outline"} colorScheme='orange' rounded={"full"}   py={"0px"} px={"15px"}>
                    
                    <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                      <Text fontWeight={"700"} fontSize={"15px"} lineHeight={"10px"} fontFamily={"mono"}>Go basket</Text>
                      <Icon as={BsFillBasket2Fill}></Icon>
                    </Flex>
                    
                  </Button>
                  </Link>)
                  : 
                  (<Button onClick={() => addToCard(item)} variant={"solid"} colorScheme='orange' rounded={"full"} fontWeight={"700"} fontSize={"17px"} fontFamily={"mono"} py={"0px"} px={"15px"}>
                    <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                      <Text w={"full"} h={"full"}>Basked</Text>
                      <Icon as={BsFillBasket2Fill}></Icon>
                    </Flex>
                  </Button>)
                }
              </Box>
            </CardBody>
          </Card>
        </GridItem>
        ))}
      </Grid>)}
    </Box>
  )
}

export default Products