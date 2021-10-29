import React, { useState,useEffect } from 'react';
import { Box, Center, Heading, Text, useTheme } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import Loader from '../Loader';

const SuccessLog = ({ colors,status,isRequested, isApproved, isReviewed, RequestDate, ApprovedDate, ReviewedDate, isRejected, RejectedDate }) => (
    <Box flex={1} width="full" 
        padding="3">
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box mt="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    {isRequested ? <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} /> : <FontAwesome name="check-circle" size={28} color="grey" />}
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color={isRequested ? "success.500":"muted.400" }>
                            Request Sent
                        </Heading>
                        { isRequested ? <Heading  mt="3"  size="xs" color="muted.400">On: {RequestDate.toString().substr(0,10)} </Heading> : <Heading  mt="3"  size="xs" color="muted.400">Pending</Heading> }
                    </Box>
                </Box>
            </Box>
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    {isApproved ? <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} /> : (isRejected ? <MaterialIcons name="cancel" size={28} color="red" /> : <FontAwesome name="check-circle" size={28} color="grey" />)}
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color={isApproved ? "success.500":"muted.400" }>
                            Consent Request Approved
                        </Heading>
                        { isApproved ? <Heading  mt="3"  size="xs" color="muted.400">On: {ApprovedDate.toString().substr(0,10)} </Heading> : (isRejected ? <Heading  mt="3"  size="xs" color="error.400">Consent Rejected</Heading> : <Heading  mt="3"  size="xs" color="muted.400">Pending</Heading>) }
                    </Box>
                </Box>
            </Box>

            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    {isReviewed ? <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} /> : <FontAwesome name="check-circle" size={28} color="grey" />}
                    <Box mb="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color={isReviewed ? "success.500":"muted.400" }>
                            Address Reviewed
                        </Heading>
                        { isReviewed ? <Heading  mt="3"  size="xs" color="muted.400">On: {ReviewedDate.toString().substr(0,10)} </Heading> : <Heading  mt="3"  size="xs" color="muted.400">Pending</Heading> }
                    </Box>
                </Box>
            </Box>
        </Box>
);
const FailedLog = ({ colors }) => (
    <Box flex={1} width="full" 
        padding="3">
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box mt="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} />
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Request Sent
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="times-circle" size={28} color={colors["error"]["500"]} />
                    <Box mb="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Consent Request Rejected
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
        </Box>
)

export default function ConsentLog({navigation,route}) {

    const [status,setStatus] = useState("");
    const [isRequested,setIsRequested] = useState(false);
    const [isApproved,setIsApproved] = useState(false);
    const [isRejected,setIsRejected] = useState(false);
    const [isReviewed,setIsReviewed] = useState(false);
    const [RequestDate,setRequestDate] = useState("");
    const [ApprovedDate,setApprovedDate] = useState("");
    const [ReviewedDate,setReviewedDate] = useState("");
    const [RejectedDate,setRejectedDate] = useState("");
    const [count,setCount] = useState(0);

    useEffect(() => {
        fetch('https://anumati.herokuapp.com/anumati-server/get-logs-by-id',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "ConsentID":route.params.ConsentId,
            })
        }).then(async function(response){
            response = await response.json();
            console.log("Log of",response);
            if(response["message"] ==='Logs Extracted Successfully')
            {
                response["data"].map(item=>{
                    if(item.Action == 'Consent Request Generated by User. Pending from approver'){
                        setIsRequested(true);
                        setRequestDate(item.createdAt);

                    }else if(item.Action == 'Consent Approved by approver'){
                        setIsApproved(true);
                        setApprovedDate(item.createdAt);
                    }else if(item.Action == 'Approved Address Reviewed by User'){
                        setIsReviewed(true);
                        setReviewedDate(item.createdAt);
                    }else if(item.Action == 'Consent Rejected by approver'){
                        setIsRejected(true);
                        setRejectedDate(item.createdAt);
                    }
                })

                setCount(1);
            }
        }).catch(err=>console.log(err));
        
    }, [])
    
    const { colors } = useTheme();

    if(count==0){
        return(
            <Loader/>
        )
    }else{

        return <Box flex={1} >
            
            {/*Show the status on SuccessLog*/}
            <SuccessLog colors={colors} status={status} isRequested={isRequested} isApproved={isApproved} isReviewed={isReviewed} RequestDate={RequestDate} ApprovedDate={ApprovedDate} ReviewedDate={ReviewedDate} isRejected={isRejected} RejectedDate={RejectedDate} />
            
            {isReviewed ? <Box 
                mx="5"
                justifyContent="center"
                alignItems="center"
                bgColor="white" 
                my="5"
                borderRadius="md">
                    <Heading onPress={() => {navigation.navigate("Request-Consent",{ConsentId:route.params.ConsentId,Screen:3})}} my="5" color="muted.600">
                        Print your Consent form
                    </Heading>
            </Box> : (isRejected ? <Box 
                    mx="5"
                    justifyContent="center"
                    alignItems="center"
                    bgColor="white" 
                    my="5"
                    borderRadius="md">
                        <Heading onPress={()=>{navigation.navigate('Request-Consent')}} my="5" color="muted.600">
                            Start New Consent   
                        </Heading>
                    </Box>:<></>)
            } 
            
        </Box>
    }    
}