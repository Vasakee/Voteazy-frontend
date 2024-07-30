import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
import GenNavbar from '../GenNavbar'
import GenResult from '../GenResult'
import Stats from '../Stats'

function GenResultPage() {
    return (
        <Flex direction='column' minHeight='100vh'>
            <GenNavbar />
            <Box p={9}>
                <Stats />
                <GenResult />
            </Box>
        </Flex>
    )
}

export default GenResultPage
