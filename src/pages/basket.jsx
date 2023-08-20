import { Box, Button, Card, CardBody, Divider, Flex, Grid, GridItem, Heading, Icon, useColorModeValue, Image, Text, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { StoreContext } from '../App'
import { BsFillBasket2Fill } from 'react-icons/bs'



const Basket = () => {

  const {store, dispatch} = useContext(StoreContext)

  const cardBg = useColorModeValue("blackAlpha.200", "blackAlpha.500")
  const cardBorder = useColorModeValue("blackAlpha.300", "grey")
  const cardBgHover = useColorModeValue("blackAlpha.300", "gray.800")
  const toast = useToast()

  const deleteProduct = product => {
    dispatch({type: "DELETE_PRODUCT_BASKET", payload: product})
    toast({
      title: 'Product removed from basket',
      status: 'success',
      duration: 2000,
      position: "bottom-left",
      
    })
  }

  return (
    <Box w={{base: "90%", sm: "85%", md: "80%"}} mx="auto" my="20px" maxW={"1200px"}>
      <Box w="full" bg={cardBg} border={"1px"} borderColor={cardBorder} rounded={"sm"} px={"10px"} py={{base: "10px", sm: "12px", md: "15px"}} my={"10px"}>
       <Heading fontSize={{base: "20px", sm: "23px", md: "25px"}}>Basket</Heading>
       <Text fontSize={{base: "10px", sm: "12px", md: "15px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, dignissimos!</Text>
      </Box>
      {store.basket.length !== 0? (<Grid gridTemplateColumns={{
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr"
      }} gap={"10px"}>
        
        {store?.basket?.map(item => (
          <GridItem key={item.idMeal}>
          <Card rounded={"sm"} border={"1px"} bg={cardBg} borderColor={cardBorder} minH="full" _hover={{bg: cardBgHover}}>
            <CardBody minH={"350px"} p={"10px"} display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"} gap="10px">
              <Box w="full" flex={"4"} display={"flex"} justifyContent={"end"} flexDirection={"column"}>
                <Image flex="4"  rounded={"sm"} src={item.strMealThumb} objectFit={"cover"} minH={"250px"}></Image>
                <Heading my={"5px"} flex={"1"} fontSize={"18px"} fontWeight={"600"}>{item.strMeal}</Heading>
              </Box>
              <Box w={"full"} flex={"1"} textAlign={"end"}>
                <Divider bg={cardBorder} h={"1px"} mb={"10px"}/>
                <Button onClick={() => deleteProduct(item.idMeal)} variant={"outline"} colorScheme="orange" rounded={"full"}   py={"0px"} px={"15px"}>
                  <Flex justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                    <Text fontWeight={"700"} fontSize={"15px"} lineHeight={"10px"} fontFamily={"mono"}>Delete</Text>
                    <Icon as={BsFillBasket2Fill}></Icon>
                  </Flex>
                </Button>
                </Box>
            </CardBody>
          </Card>
        </GridItem>))}
      </Grid> )
      :
      (<Box w={"full"} minH={"70vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"20px"}>
          <Icon fontSize={{base: "20px", sm: "30px", md: "40px"}} as={BsFillBasket2Fill}></Icon>
          <Text fontSize={{base: "10px", sm: "15px", md: "20px"}}>Your shopping basket is ready to add products</Text>
      </Box>)}
    </Box>
  )
}

export default Basket