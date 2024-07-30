import React from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import CitizenNavbar from '../CitizenNavbar'
import Votes from '../Votes'
import CountdownTimer from '../CountdownTimer'
import { useNavigate } from 'react-router'
import { useToast } from '@chakra-ui/toast'

function VotePage({ citizen, setCitizen, token, setToken }) {

    const Navigate = useNavigate()
    const Notify = useToast()

    const handleLogout = () => {
        try {
            localStorage.removeItem('Tokenn');
            localStorage.removeItem('Citizen');
            setCitizen(null);
            // console.log(data)
            Notify({
                title: 'Logout successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            Navigate('/')
        } catch (error) {
            Notify({
                title: { 'An error Occured': error.message },
                status: 'error',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }
    return (
        <Flex direction='column' minHeight='100vh' >
            <Flex direction='column' flex='1' bg='white'>
                <CitizenNavbar citizen={citizen} setCitizen={setCitizen} handleLogout={handleLogout} />
                <Box mt={8} ml={5} p={9}>
                    <CountdownTimer time={300} citizen={citizen} setCitizen={setCitizen} onTimeOut={handleLogout} />
                    <Votes citizen={citizen} setCitizen={setCitizen} token={token} setToken={setToken} handleLogout={handleLogout} />
                </Box>
            </Flex>
        </Flex>
    )
}

export default VotePage
