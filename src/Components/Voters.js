import { Avatar } from '@chakra-ui/avatar'
import { Box, Heading } from '@chakra-ui/layout'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PageLoading from './PageLoading'

function Voters() {
    const [voters, setVoters] = useState([])
    const [loading, setLoading] = useState(false)

    const Notify = useToast()

    useEffect(() => {
        fetchVoters()
    }, [])

    const fetchVoters = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://registration-9784.onrender.com/api/')
            setVoters(response.data)
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            Notify({
                title: 'Error Fetching candidates',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            console.log(error.message)
            setLoading(false)
        }
    }

    /*const Voters = [
        {
            id: 1,
            profile: 'path/to/profile1.png',
            name: 'Basil Dayigil',
            email: 'Omah@demo.com',
            songs: 68,
            albums: 16,
            reviews: 12,
        },
        {
            id: 2,
            profile: 'path/to/profile2.png',
            name: 'Godwin Dalyop',
            email: 'Godwin@demo.com',
            songs: 68,
            albums: 16,
            reviews: 12,
        },
        {
            id: 3,
            profile: 'path/to/profile3.png',
            name: 'Victor Adams ',
            email: 'Victor@demo.com',
            songs: 68,
            albums: 16,
            reviews: 12,
        },
    ]*/
    return (
        <Box padding="4" >
            <Heading as="h2" size="md" className="card-title text-capitalize" mb={6}>Accredited Voters</Heading>
            <TableContainer>
                {loading ? (
                    <PageLoading />
                ) : (
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>No.</Th>
                                <Th>Profile</Th>
                                <Th> Name</Th>
                                <Th>Email</Th>
                                <Th>State</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {voters.map((voter, index) => (
                                <Tr key={voter.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>
                                        <Avatar src={'.//'} name={voter.firstName || voter.lastName} />
                                    </Td>
                                    <Td>{voter.firstName}  {voter.lastName}</Td>
                                    <Td>{voter.email}</Td>
                                    <Td>{voter.stateOfOrigin}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    )
}

export default Voters
