import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
import Candidate from '../Candidate'
//import Dashboard from '../Dashboard'
import Navbar from '../Navbar'
import Result from '../Result'
//import Party from '../Party'
import Sidee from '../Sidee'
//import VotersPage from './VotersPage'

function ResultPage({ user, setUser }) {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Flex direction='column' minHeight='100vh' >
            <Flex direction='row' flex='1'>
                <Sidee isOpen={isOpen} onToggle={onToggle} />
                <Flex direction='column' flex='1' bg='white'>
                    <Navbar onSideBarToggle={onToggle} user={user} setUser={setUser} />
                    <Box mt={8} ml={5} p={9}>
                        <Result user={user} setUser={setUser} />
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ResultPage
