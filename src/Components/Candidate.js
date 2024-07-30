import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Icon } from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal'
import { Spinner } from '@chakra-ui/spinner'
import { useToast } from '@chakra-ui/toast'
import { Tooltip } from '@chakra-ui/tooltip'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'
import AddCandidate from './AddCandidate'
import PageLoading from './PageLoading'

function Candidate({ user, setUser }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const cancelRef = useRef();

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

    const addNewCandidate = (newCandidate, category) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            const categoryIndex = updatedCategories.findIndex((cat) => cat.category === category);
            if (categoryIndex !== -1) {
                updatedCategories[categoryIndex].candidates.push(newCandidate);
            } else {
                updatedCategories.push({ category, candidates: [newCandidate] });
            }
            return updatedCategories;
        });
    };

    const handleDelete = async (categoryName, candidateId) => {
        console.log(categoryName, candidateId)
        try {
            const token = user.token
            console.log(token)
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
            const response = await axios.delete(`/candidates/${categoryName}/${candidateId}`, config);
            Notify({
                title: 'Candidate deleted successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setCategories((prevCategories) =>
                prevCategories.map((category) => ({
                    ...category,
                    candidates: category.candidates.filter((candidate) => candidate._id !== candidateId),
                }))
            );
        } catch (error) {
            Notify({
                title: 'Error deleting candidate',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
            console.log(error.message);
        }
    };
    /*const Candidates = [
        {
            id: '1', profilePic: 'https:firebasestorage.googleapis.com/v0/b/musikk-e80a3.appspot.com/o/images%20%2F%20Anon.png?alt=media&token=a7d242ab-eeb2-4f4a-aaeb-037038e6910b', name: 'Basil Dayigil', Party: 'BBD'
        }
    ]*/
    return (
        <>
            <Box>
                <Container maxW="container.xl" py={4}>
                    <Box className="row mb-4">
                        <Box className="card-header" mb={3}>
                            <Flex className="header-title" alignItems="center" justifyContent="space-between" mb={6}>
                                <Heading as="h5" size="lg" className="card-title text-capitalize" mb={3}>Candidates</Heading>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    onClick={onOpen}
                                >
                                    Add Candidate
                            </Button>
                            </Flex>
                        </Box>
                    </Box>
                    {loading ? (
                        <Spinner size='xl' thickness='4px' speed='0.65s' emptyColor='grey.200' color='teal.200' />
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
                                            height={{ base: "auto", md: "350px", lg: '390px' }} // Responsive height
                                            width={{ base: "100%", md: "200px", lg: '220px' }}
                                            position='relative'
                                        >
                                            <Flex alignItems='flex-start'>
                                                <Icon
                                                    as={FaEllipsisV}
                                                    position="absolute"
                                                    top='3px'
                                                    right='3px'
                                                    cursor='pointer'
                                                    colorScheme='black.500'
                                                    onClick={() => {
                                                        setSelectedCandidate({ categoryName: category.category, candidateId: candidate._id });
                                                        onAlertOpen();
                                                    }}
                                                    aria-label="Delete candidate"
                                                />
                                            </Flex>
                                            <VStack mt={5} spacing={3} alignItems="center">
                                                <Image src={candidate.Pic} className="img-fluid rounded-3" borderRadius={8}
                                                    objectFit='cover' boxSize={{ base: '80px', md: '120px', lg: '170px' }} alt="candidate-img" />
                                                <Text><b>Name</b>: {candidate.name}</Text>
                                                <Text><b>Party</b>: {candidate.party}</Text>
                                                <Text><b>State</b>: {candidate.state}</Text>
                                                <Text mb={3}><b>LGA</b>: {candidate.localGovernment}</Text>
                                            </VStack>
                                        </Box>

                                    ))}
                                </SimpleGrid>
                            </Box>
                        ))
                    )}
                </Container>
            </Box>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Candidate
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this candidate?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleDelete(selectedCandidate.categoryName, selectedCandidate.candidateId);
                                    onAlertClose();
                                }}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Drawer placement='right' onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader >Upload Candidate</DrawerHeader>
                    <DrawerBody>
                        <AddCandidate user={user} setUser={setUser} addNewCandidate={addNewCandidate} onClose={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Candidate
