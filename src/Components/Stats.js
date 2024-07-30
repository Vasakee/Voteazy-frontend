import { Box, SimpleGrid } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/icon'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FaFile, FaUser, FaUsers, FaVoteYea, FaCheck, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'

function Stats() {
    const [totalVotes, settotalVotes] = useState(0)
    const [valid, setValid] = useState(0)
    const [invalid, setInvalid] = useState(0)

    const Navigate = useNavigate()
    const Notify = useToast()

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/user/')
            console.log(response.data)
            const users = response.data
            console.log(users)
            const validVotes = users.filter(user => user.hasVoted).length
            const invalidVotes = users.filter(user => !user.hasVoted).length

            settotalVotes(users.length)
            setValid(validVotes)
            setInvalid(invalidVotes)
        } catch (error) {
            Notify({
                title: 'Error fetching Stats',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={10} mb={8} mt={8} ml={6}>
            <Box
                bg="teal.100"
                p={6}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
            >
                <Icon as={FaVoteYea} boxSize={8} color="teal.500" />
                <Stat mt={4}>
                    <StatNumber>{totalVotes}</StatNumber>
                    <StatLabel> Total Votes Casted</StatLabel>
                </Stat>
            </Box>
            <Box
                bg="green.100"
                p={4}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
            >
                <Icon as={FaCheck} boxSize={10} color="green.500" />
                <Stat mt={4}>
                    <StatNumber>{valid}</StatNumber>
                    <StatLabel> Valid Votes</StatLabel>
                </Stat>
            </Box>
            <Box
                bg="red.100"
                p={4}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
            >
                <Icon as={FaTimes} boxSize={8} color="red.500" />
                <Stat mt={4}>
                    <StatNumber>{invalid}</StatNumber>
                    <StatLabel>Invalid Votes</StatLabel>
                </Stat>
            </Box>
        </SimpleGrid>
    )
}

export default Stats
