import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import Candidate from '../Candidate'
import Dashboard from '../Dashboard'
import Navbar from '../Navbar'
import Party from '../Party'
import Sidee from '../Sidee'
import Voters from '../Voters'

function AdminDashboard({ user, setUser }) {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Flex direction='column' minHeight='100vh' >
            <Flex direction='row' flex='1'>
                <Sidee isOpen={isOpen} onToggle={onToggle} />
                <Flex direction='column' flex='1' bg='white'>
                    <Navbar onSideBarToggle={onToggle} user={user} setUser={setUser} />
                    <Box mt={8} ml={5} p={9}>
                        <Flex className="header-title" alignItems="center" justifyContent="space-between" mb={5}>
                            <Text as="h4" size="lg" className="card-title text-capitalize" mb={3}>Welcome <b>{user.name}</b></Text>
                        </Flex>
                        <Box mt={5} p={5}>
                            <Dashboard />
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AdminDashboard
