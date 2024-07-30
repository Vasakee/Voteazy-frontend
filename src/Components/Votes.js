import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Box, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import PageLoading from './PageLoading';

function Votes({ citizen, setCitizen, token, setToken, handleLogout }) {
    const [categories, setCategories] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState({});
    const [loading, setLoading] = useState(false);
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const cancelRef = useRef();
    const Notify = useToast();
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchCandidates = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('Tokenn');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get('/vote/voters', config);
                setCategories(response.data.categories);
                console.log(response.data.categories)
                setLoading(false);
            } catch (error) {
                Notify({
                    title: error.response.data.message || 'Error fetching Candidates',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                });
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [Notify]);

    /*const handleLogout = () => {
        try {
            localStorage.removeItem('Tokenn')
            localStorage.removeItem('Citizen')
            setCitizen(null)
            Notify({
                title: 'Logged out successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            Navigate('/')
        } catch (error) {
            Notify({
                title: { 'An error occured': error.message },
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }*/
    const handleVote = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
            };
            const selectedOptions = Object.values(selectedCandidates);
            await axios.post('http://localhost:3001/vote/votes', { selectedOptions }, config);
            Notify({
                title: 'Votes submitted successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            setLoading(false);
        } catch (error) {
            Notify({
                title: error.response.data.message || 'Error submitting vote',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            setLoading(false);
        }
    };

    const handleCheckboxChange = (categoryId, candidateId) => {
        setSelectedCandidates(prevState => {
            const newSelectedCandidates = { ...prevState };
            if (newSelectedCandidates[categoryId] === candidateId) {
                delete newSelectedCandidates[categoryId];
            } else {
                newSelectedCandidates[categoryId] = candidateId;
            }
            return newSelectedCandidates;
        });
    };


    const handleSubmitVote = () => {
        handleVote();
        onAlertClose();
        handleLogout()
    };

    return (
        <>
            <Box>
                <Container maxW="container.xl" py={4}>
                    <Box className="row mb-4">
                        <Box className="card-header" mb={3}>
                            <Flex className="header-title" alignItems="center" justifyContent="space-between" mb={6}>
                                <Heading as="h5" size="lg" className="card-title text-capitalize" mb={3}>Candidates</Heading>
                            </Flex>
                        </Box>
                    </Box>
                    {loading ? (
                        <PageLoading />
                    ) : (
                        categories.map((category) => (
                            <Box key={category._id} mb={8}>
                                <Heading as="h2" size="lg" mb={4}>{category.name}</Heading>
                                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="8">
                                    {category.candidates.map((candidate) => (
                                        <Box
                                            key={candidate._id}
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            overflow="hidden"
                                            bg="green.200"
                                            p="8"
                                            mr={6}
                                            boxShadow="md"
                                        >
                                            <Image src={candidate.Pic} alt={candidate.name} boxSize="150px" objectFit="cover" mx="auto" />
                                            <Box p="4" textAlign="center">
                                                <Text fontWeight="bold" fontSize="xl" mb="2">{candidate.name}</Text>
                                                <Text mb="2">Party: {candidate.party}</Text>
                                                <Text mb="2">State: {candidate.state}</Text>
                                                <Text mb="2">Local Government: {candidate.localGovernment}</Text>
                                                <Checkbox
                                                    colorScheme="teal"
                                                    mb="2"
                                                    isChecked={selectedCandidates[category._id] === candidate._id}
                                                    onChange={() => handleCheckboxChange(category._id, candidate._id)}
                                                >Vote</Checkbox>
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        ))
                    )}
                    <Button onClick={onAlertOpen} colorScheme='teal'>
                        Submit Votes
                                </Button>
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
                            Submit Votes
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to submit your votes?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose} colorScheme="red">
                                No, review
                            </Button>
                            <Button
                                colorScheme="green"
                                onClick={handleSubmitVote}
                                ml={3}
                                isLoading={loading}
                            >
                                Yes, Submit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default Votes;