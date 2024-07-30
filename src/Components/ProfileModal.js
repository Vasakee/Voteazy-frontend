import { ViewIcon } from '@chakra-ui/icons'
import {
    IconButton, useDisclosure, Modal, ModalContent, ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter, Text, Button, ModalOverlay, Image,
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useBreakpointValue
} from '@chakra-ui/react'
import React from 'react'



const ProfileModal = ({ name, State, LocalGovernment, children, profilePic }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                            <b>State Of Origin:</b> {State}
                        </Text>
                        <Text fontSize={{ base: '28px', md: '30px' }} fontFamily='serif'>
                            <b>Local Government:</b> {LocalGovernment}
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} bg='teal.500'>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal