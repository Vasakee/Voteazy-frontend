import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/layout'
import axios from 'axios'
import { useDisclosure } from '@chakra-ui/hooks'
import { Icon } from '@chakra-ui/icon'
import { useToast } from '@chakra-ui/toast'
import React, { useState, useEffect, useRef } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal'
import PageLoading from './PageLoading'
import { FaEllipsisV } from 'react-icons/fa'
import AddParty from './AddParty'
import { Spinner } from '@chakra-ui/spinner'

function Party({ user, setUser }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [parties, setParties] = useState([])
    const [loading, setLoading] = useState(false)
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [selectedParty, setSelectedParty] = useState(null);
    const cancelRef = useRef();

    const Notify = useToast()

    useEffect(() => {
        const fetchParties = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/party/')
                console.log(response.data)
                setParties(response.data)
                setLoading(false)
            } catch (error) {
                Notify({
                    title: 'Error fetching Parties',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                })
                console.log(error.message)
            }
        }
        fetchParties()
    }, [])
    const handleDelete = async (partyId) => {

        try {
            const token = user.token
            console.log(token)
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
            const response = await axios.delete(`/party/${partyId}`, config);
            setParties(parties.filter(party => party._id !== partyId));
            Notify({
                title: 'Party deleted successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        } catch (error) {
            Notify({
                title: 'Error deleting Party',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
            console.log(error.message);
        }
    };
    const addPartyToList = (newParty) => {
        setParties([...parties, newParty]);
    };
    /*const Candidates = [
        {
            id: '1', profilePic: 'https:firebasestorage.googleapis.com/v0/b/musikk-e80a3.appspot.com/o/images%20%2F%20Anon.png?alt=media&token=a7d242ab-eeb2-4f4a-aaeb-037038e6910b', name: 'Peoples Democratic Party',
        }
    ]*/
    return (
        <>
            <Box>
                <Container maxW="container.xl" py={4}>
                    <Box className="row mb-4">
                        <Box className="card-header" mb={3}>
                            <Flex className="header-title" alignItems="center" justifyContent="space-between" mb={6}>
                                <Heading as="h4" size="md" className="card-title text-capitalize" mb={3}>Political Parties</Heading>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    onClick={onOpen}
                                >
                                    Add Party
                            </Button>
                            </Flex>
                        </Box>
                    </Box>
                    {loading ? (
                        <Spinner size='xl' thickness='4px' speed='0.65s' emptyColor='grey.200' color='teal.200' />
                    ) : (
                        <SimpleGrid columns={{ base: 2, md: 4, lg: 4 }} spacing={2} className="list-unstyled mb-0">
                            {parties.map((party) => (
                                <Box key={party._id} className="col">
                                    <Box className="card" bg='gray.200'
                                        mr={4}
                                        p={2}
                                        borderRadius='lg'
                                        textAlign='center'
                                        height={{ base: 'auto', md: '300px', lg: '350px' }}
                                        width={{ base: "100%", md: "200px", lg: '250px' }}
                                        position='relative'
                                    >
                                        <Flex alignContent='flex-end'>
                                            <Icon
                                                as={FaEllipsisV}
                                                position='absolute'
                                                top='3px'
                                                right='3px'
                                                cursor='pointer'
                                                colorScheme='black.500'
                                                onClick={() => {
                                                    setSelectedParty({ partyId: party._id });
                                                    onAlertOpen();
                                                }}
                                                aria-label='Delete Party'
                                            />
                                        </Flex>
                                        <VStack mt={5} spacing={3} alignItems="center">
                                            <Image src={party.logo} id={party.id} className="img-fluid rounded-3" borderRadius={8}
                                                objectFit='cover' boxSize={{ base: '100px', md: '150px', lg: '200px' }} alt="song-img" borderRadius={10} />
                                            <Text as="a" className="partyname"><b>Name</b>: {party.name}</Text>
                                            <Text className="partyinitials"> <b>({party.initials})</b></Text>
                                        </VStack>
                                    </Box>
                                </Box>
                            ))}
                        </SimpleGrid>
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
                            Delete Party
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this Party?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose} addPartyToList={addPartyToList} >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleDelete(selectedParty.partyId);
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
                    <DrawerHeader>Add Party</DrawerHeader>
                    <DrawerBody>
                        <AddParty user={user} setUser={setUser} onClose={onClose} addPartyToList={addPartyToList} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Party
