import { Box, SimpleGrid } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/icon'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import { Link } from 'react-router-dom'
import React from 'react'
import { FaFile, FaUser, FaUsers, FaUserFriends } from 'react-icons/fa'

function Dashboard() {
    return (
        <SimpleGrid columns={{ base: 2, md: 2, lg: 2 }} spacing={10} mb={8} >
            <Link to='/Candidates'>
                <Box
                    bg="red.100"
                    p={6}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="lg"
                >
                    <Icon as={FaUser} boxSize={8} color="red.500" />
                    <Stat mt={4}>
                        <StatNumber></StatNumber>
                        <StatLabel> Candidates</StatLabel>
                    </Stat>
                </Box>
            </Link>
            <Link to='/Results'>
                <Box
                    bg="yellow.100"
                    p={4}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="lg"
                >
                    <Icon as={FaFile} boxSize={10} color="yellow.500" />
                    <Stat mt={4}>
                        <StatNumber></StatNumber>
                        <StatLabel> Election Results</StatLabel>
                    </Stat>
                </Box>
            </Link>
            <Link to='/Voters'>
                <Box
                    bg="blue.100"
                    p={4}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="lg"
                >
                    <Icon as={FaUsers} boxSize={8} color="blue.500" />
                    <Stat mt={4}>
                        <StatNumber></StatNumber>
                        <StatLabel>Qualified Voters</StatLabel>
                    </Stat>
                </Box>
            </Link>
            <Link to='/Party'>
                <Box
                    bg="green.100"
                    p={4}
                    borderRadius="lg"
                    textAlign="center"
                    boxShadow="lg"
                >
                    <Icon as={FaUserFriends} boxSize={8} color="green.500" />
                    <Stat mt={4}>
                        <StatNumber></StatNumber>
                        <StatLabel>Political Parties</StatLabel>
                    </Stat>
                </Box>
            </Link>
            {/*<Box
                bg="green.100"
                p={4}
                borderRadius="lg"
                textAlign="center"
                boxShadow="md"
            >
                <Icon as={FaUsers} boxSize={8} color="purple.500" />
                <Stat mt={4}>
                    <StatNumber></StatNumber>
                    <StatLabel>Total Users</StatLabel>
                </Stat>
            </Box>*/}
        </SimpleGrid>
    )
}

export default Dashboard
