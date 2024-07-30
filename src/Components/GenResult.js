import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Icon } from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import { Tooltip } from '@chakra-ui/tooltip'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'
import AddCandidate from './AddCandidate'
import PageLoading from './PageLoading'

function GenResult({ user, setUser }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const Notify = useToast()

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/candidates/')
                setCategories(response.data)
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                Notify({
                    title: 'Error fetching Candidates',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                })
                console.log(error.message)
            }
        }
        fetchCandidates()
    }, [])


    return (
        <>
            <Box>
                <Container maxW="container.xl" py={4}>
                    <Box className="row mb-4">
                        <Box className="card-header" mb={3}>
                            <Flex className="header-title" alignItems="center" justifyContent="space-between" mb={6}>
                                <Heading as="h5" size="lg" className="card-title text-capitalize" mb={3}>Results</Heading>
                            </Flex>
                        </Box>
                    </Box>
                    {loading ? (
                        <PageLoading />
                    ) : (
                        categories.map((category) => (
                            <Box key={category.category} mb={8}>
                                <Heading as="h1" size="md" mb={4}>{category.category}</Heading>
                                <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={8}>
                                    {category.candidates.map((candidate) => (
                                        <Box className="card" bg="green.200"
                                            mr={4}
                                            p={2}
                                            key={candidate._id}
                                            borderRadius="lg"
                                            textAlign="center"
                                            height={{ base: "auto", md: "350px", lg: '400px' }} // Responsive height
                                            width={{ base: "100%", md: "200px", lg: '220px' }}
                                            position='relative'
                                        >
                                            <VStack mt={5} spacing={3} alignItems="center">
                                                <Image src={candidate.Pic} className="img-fluid rounded-3" borderRadius={8}
                                                    objectFit='cover' boxSize={{ base: '80px', md: '120px', lg: '170px' }} alt="candidate-img" />
                                                <Text><b>Name</b>: {candidate.name}</Text>
                                                <Text><b>Party</b>: {candidate.party}</Text>
                                                <Text><b>State</b>: {candidate.state}</Text>
                                                <Text ><b>LGA</b>: {candidate.localGovernment}</Text>
                                                <Text><b>Votes</b>: {candidate.votes}</Text>
                                            </VStack>
                                        </Box>

                                    ))}
                                </SimpleGrid>
                            </Box>
                        ))
                    )}
                </Container>
            </Box>
        </>
    )
}

export default GenResult
