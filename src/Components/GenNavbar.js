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
import ProfileModal from './ProfileModal'

function GenNavbar({ citizen, setCitizen, handleLogout }) {
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const Notify = useToast()

    const Navigate = useNavigate()

    return (
        <div>
            <Box bg="teal.800" px={4} width="100%" zIndex="1" color='white' width={'100%'}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <HStack spacing={8} alignItems="center">
                        <Box ml={10} mr={8} color="white" fontSize='x-large' fontStyle='italic' fontWeight="bold" display={{ base: 'block', md: 'block' }}>VOTEAZY!</Box>
                    </HStack>
                </Flex>
            </Box>
        </div>
    )
}

export default GenNavbar
