import { Box, Container, Text } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import React from 'react'
import AdminAuth from './AdminAuth'
import CitizenAuth from './CitizenAuth'

function AuthPage({ user, setUser, citizen, setCitizen }) {
    return (
        <Container>
            <Box display="flex"
                justifyContent="center"
                p={3}
                bg='teal.600'
                w="100%"
                color='white'
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px">
                <Text fontSize='x-large' fontStyle='italic' fontWeight="bold" >VOTEAZY!</Text>
            </Box>
            <Box bg='gray.400' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
                <Tabs variant='soft-rounded' >
                    <TabList mb='1em'>
                        <Tab width='50%' color='black.900'>Sign in as Citizen</Tab>
                        <Tab width='50%' color='black.900'>Sign in as Admin</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div><CitizenAuth citizen={citizen} setCitizen={setCitizen} /></div>
                        </TabPanel>
                        <TabPanel>
                            <div><AdminAuth user={user} setUser={setUser} /></div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default AuthPage
