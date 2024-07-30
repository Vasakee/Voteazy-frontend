import { ViewIcon } from '@chakra-ui/icons'
import {
    IconButton, useDisclosure, Modal, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter, Text, Button, ModalOverlay, Image,
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useBreakpointValue
} from '@chakra-ui/react'
import React from 'react'
import AddSong from './AddSong'


const ProfileModal = ({ name, email, category, children, profilePic }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose
    } = useDisclosure()
    const modalSize = useBreakpointValue({ base: 'xs', md: 'lg' });

    return (
        <>
            {children ? (
                <span onClick={onOpen}>
                    {children}
                </span>) : (
                <IconButton display={{ base: 'flex' }}
                    icon={<ViewIcon />} onClick={onOpen} />
            )
            }
            <Modal isCentered size={modalSize} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} fontFamily='heading' justifyContent={'center'} fontSize='40px'>
                        {name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection='column' alignItems={'center'} justifyContent='space-between'>
                        <Image src={profilePic} alt={name} borderRadius='full' boxSize='150px' />
                        <Text fontSize={{ base: '28px', md: '30px' }} fontFamily='serif'>
                            <b>Email:</b> {email}
                        </Text>
                        <Text fontSize={{ base: '28px', md: '30px' }} fontFamily='serif'>
                            <b>Category:</b> {category}
                        </Text>
                        {category.toLowerCase() === 'artist' && (
                            <Button
                                mt={4}
                                colorScheme='teal'
                                onClick={onDrawerOpen}
                            >
                                Add Song
                            </Button>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} bg='blue.500'>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Drawer placement='right' onClose={onDrawerClose} isOpen={isDrawerOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader >Upload Music</DrawerHeader>
                    <DrawerBody>
                        <AddSong />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            /*(
                        categories.map((category) => (
                            <Box key={category._id} mb={8}>
                <Heading as="h1" size="md" mb={4}>{category.name}</Heading>
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
                                <Checkbox
                                    key={candidate._id}
                                    isChecked={selectedCandidates[category._id] === candidate._id}
                                    onChange={() => handleCheckboxChange(category._id, candidate._id)}
                                >
                                    <Text><b>Votes:</b> {candidate.votes}</Text>
                                </Checkbox>
                            </VStack>
                        </Box>

                    )
                    )}
                </SimpleGrid>
                <Button colorScheme="teal" onClick={handleVote}>
                    Submit Vote
                                </Button>
            </Box>
                        ))
                            )*/
        </>
    )
}

export default ProfileModal