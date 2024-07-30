import { Avatar } from '@chakra-ui/avatar'
import { Button, IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { useNavigate } from 'react-router'

function Navbar({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const Notify = useToast()

    const Navigate = useNavigate()
    //const handleLogout = () => {
    //    localStorage.removeItem('token');
    //    localStorage.removeItem('user');
    //    setUser(null);
    //    Navigate('/');
    //};

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            // console.log(data)
            Notify({
                title: 'Logout successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            Navigate('/')
        } catch (error) {
            Notify({
                title: { 'An error Occured': error.message },
                status: 'error',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }

    return (
        <div>
            <Box bg="teal.800" px={4} width="100%" zIndex="1" color='white' width={'100%'}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <HStack spacing={8} alignItems="center">
                        {/*<IconButton
                            size="md"
                            //icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label="Toggle Menu"
                            display={{ md: 'none' }}
                            onClick={isOpen ? onClose : onOpen}
                        />*/}
                        <Box ml={10} mr={8} color="white" fontSize='x-large' fontStyle='italic' fontWeight="bold" display={{ base: 'block', md: 'block' }}>VOTEAZY!</Box>
                    </HStack>
                    <Box display={{ base: 'block', md: 'block' }} ml={4} color='black' ml={10}>
                        <Menu>
                            <MenuButton as={Button} >
                                <Avatar size={'sm'} cursor='pointer' name={user.name} src={'.///'} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem><b>{user.name}</b> </MenuItem>
                                {/*<Profil name={userDetails.name} email={userDetails.email}
                                    category={userDetails.userCategory} profilePic={userDetails.profilePic}  >
                                    <MenuItem>My Profile</MenuItem>
                                 </Profil>*/}
                                <MenuItem onClick={handleLogout} isLoading={loading}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>

                {/*
                    isOpen ? (
                        <Box pb={4} display={{ md: 'none' }}>
                            <Stack as="nav" spacing={4}>
                                <Text px={2} py={1} to='/Dashboard' rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.700' }} bg='white' color="white" >
                                    Dashboard
          </Text>
                                <Text px={2} py={1} to='/Songs' rounded={'md'} _hover={{ textDecoration: 'none', bg: 'gray.700' }} bg='white' color="white" >
                                    Votes
          </Text>
                            </Stack>
                        </Box>
                    ) : null
                    */}
            </Box>
        </div>
    )
}

export default Navbar
