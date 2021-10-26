import React from "react"
import {Box,FlatList,Heading,Avatar,HStack,VStack,Text,Spacer,Center,NativeBaseProvider,} from "native-base"
import Logo from '../assets/Aadhar-Color.png';

const Example = () => {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      Type: "Request for Your Address",
      timeStamp: "12:47 PM",
      Text: "Open up the Consent",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      Type: "Your Consent got Approved",
      timeStamp: "6:22 PM",
      Text: "Review",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      Type: "Final Approved Address",
      timeStamp: "8:56 PM",
      Text: "See Now",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      Type: "Request for Your Address",
      timeStamp: "12:47 PM",
      Text: "Open up the Consent",
      
    },
  ]
  return (
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <Heading fontSize="xl" p="4" pb="3">
        Notifications
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: 'https://uidai.gov.in/images/aadhaar_logo_diagram.jpg',
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.Type}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.Text}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.timeStamp}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  )
}

export default function Notifications(){
  return (
    <NativeBaseProvider>
      <Example />
    </NativeBaseProvider>
  )
}
