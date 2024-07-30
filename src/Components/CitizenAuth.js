import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'

function CitizenAuth({ citizen, setCitizen }) {
    const [email, setEmail] = useState('')
    const [citizenNumber, setcitizenNumber] = useState('')
    const [loading, setLoading] = useState(false)

    const Navigate = useNavigate()
    const Notify = useToast()

    const SignIn = async () => {
        setLoading(true)
        if (!email || !citizenNumber) {
            Notify({
                title: 'Please fill all fields!',
                status: 'warning',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const response = await axios.post('/user/login', { email, citizenNumber },
                config
            )
            if (response.status === 200) {
                const { token, user } = response.data

                localStorage.setItem('Tokenn', token)
                console.log(token)
                localStorage.setItem('Citizen', JSON.stringify(user))
                setCitizen(user)
                console.log(user)
                console.log(response)
                Notify({
                    title: 'Login successful',
                    description: 'You have successfully logged in.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                });
                setLoading(false)
                Navigate('/Votes')
            }
        } catch (error) {
            console.log(error.message)
            Notify({
                title: error.response.data.message || 'An error Occured',
                status: 'error',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }
    }

    return (
        <Box bg="gray.200" p={8} rounded="lg" shadow="md" width="100%" maxW="lg">
            <Heading as="h6" size="lg" textAlign="center" mb={2}>
                Sign In to exercise your civic rights
            </Heading>
            <form>
                <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={4}>
                    <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} placeholder="Enter email here" onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id='citizenNumber' isRequired>
                        <FormLabel>Citizen Number</FormLabel>
                        <Input type="text" value={citizenNumber} placeholder="Enter email here" onChange={(e) => setcitizenNumber(e.target.value)} />
                    </FormControl>
                </Grid>
                <Stack mt={4} alignItems='center'>
                    <Link to='/Result' color="teal.500" >View Results</Link>
                    <Button bg="teal.600" onClick={SignIn} type="submit" width="full" isLoading={loading}>
                        Sign In
            </Button>
                </Stack>
                <Text mt={3} textAlign="center">
                    Please don't log in if you have already voted!
                </Text>
            </form>
        </Box>
    )
}

export default CitizenAuth
