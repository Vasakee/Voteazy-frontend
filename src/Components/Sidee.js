import { IconButton } from '@chakra-ui/button'
import { Icon } from '@chakra-ui/icon'
import { Link } from 'react-router-dom'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { Tooltip } from '@chakra-ui/tooltip'
import { Collapse } from '@chakra-ui/transition'
import React, { useState } from 'react'
import {
    FaAngleLeft, FaAngleRight, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowDown, FaArrowLeft, FaArrowUp, FaCircle,
    FaFile, FaHome, FaUserAlt, FaUserFriends, FaUsers,
} from 'react-icons/fa'

function Sidee({ isOpen, onToggle }) {
    const [OpenSection, setOpenSection] = useState(null)

    /*const toggleSection = (section) => {
        if (OpenSection === section) {
            setOpenSection(null)
        } else {
            setOpenSection(section)
        }
    }*/
    return (
        <Flex position='relative'   >
            <IconButton
                aria-label="Toggle Sidebar"
                icon={isOpen ? <FaAngleLeft color={'white'} mr={10} /> : <FaAngleRight color={'white'} mr={10} />}
                onClick={onToggle}
                position='absolute'
                bg='teal.900'
                top='4'
                left='4'
                zIndex='1'
                display={{ md: 'block', lg: 'Block' }}
                mb={10}
            />
            <Box
                as="aside"
                width={{ base: isOpen ? '35vw' : '10vw', md: isOpen ? '150px' : '40px' }}
                display={{ md: 'Block', lg: 'Block' }}
                bg="gray.100"
                p={4}
                height="100%"
                overflowX="hidden"
                overflowY='auto'
                transition="width 0.3s"
                position="relative"
                bg='teal.900'
                color='white'
            >
                <Box mt={10}>
                    <Box mt={10} mb={8}>
                        <Flex align='center' cursor='pointer' mt={8} mb={8}>
                            <Link to='/Dashboard'>
                                {/*<Tooltip >*/}
                                {<Icon as={FaHome} mr='2' />}
                                <Text display={isOpen ? 'block' : 'none'}>Dashboard</Text>
                                {/*</Tooltip>*/}
                            </Link>
                        </Flex>
                    </Box>
                    <Box mb={8} mt={5}>
                        <Flex align='center' cursor='pointer' mt={5}>
                            <Link to='/Candidates'>
                                {<Icon as={FaUserAlt} mr='2' />}
                                <Text display={isOpen ? 'block' : 'none'}>Candidates</Text>
                            </Link>
                        </Flex>
                    </Box>
                    <Box mb={8} mt={5}>
                        <Flex align='center' cursor='pointer' mt={5}>
                            <Link to='/Results'>
                                {<Icon as={FaFile} mr='2' />}
                                <Text display={isOpen ? 'block' : 'none'}>Election Results</Text>
                            </Link>
                        </Flex>
                    </Box>
                    <Box mb={8} mt={5}>
                        <Flex align='center' cursor='pointer' mt={5}>
                            <Link to='/Voters'>
                                {<Icon as={FaUsers} mr='2' />}
                                <Text display={isOpen ? 'block' : 'none'}>Qualified Voters</Text>
                            </Link>
                        </Flex>
                    </Box>
                    <Box mb={8} mt={5}>
                        <Flex align='center' cursor='pointer' mt={5}>
                            <Link to='/Party'>
                                {<Icon as={FaUserFriends} mr='2' size='md' />}
                                <Text display={isOpen ? 'block' : 'none'}>Political Parties</Text>
                            </Link>
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default Sidee
