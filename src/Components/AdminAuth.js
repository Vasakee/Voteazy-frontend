import { Button, IconButton } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Grid, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'

function AdminAuth({ user, setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const Navigate = useNavigate()
    const Notify = useToast()

    const handleClick = () => setShow(!show)

    const SignIn = async () => {
        setLoading(true)
        if (!email || !password) {
            Notify({
                title: 'Please fill all fields!',
                status: 'warning',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
        /*else {
            setLoading(true)
            Navigate('/DashBoard')
        }*/
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const { data } = await axios.post(
                "/admin/login", { email, password },
                config
            )
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            console.log(data)
            Notify({
                title: 'Login successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
            Navigate('/DashBoard')
        } catch (error) {
            Notify({
                title: 'An error Occured',
                status: 'error',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }
    }

    // const SignInnn = () => {
    // }
    return (
        <Box bg="gray.200" p={8} rounded="lg" shadow="md" width="100%" maxW="lg">
            <Heading as="h6" size="lg" textAlign="center" mb={2}>
                Sign In to perform admin duties
            </Heading>
            <form>
                <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={4}>
                    <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} placeholder="Enter email here" onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input placeholder='Enter password here' value={password} type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                            <InputRightElement width={'4.5rem'} >
                                <Button h='1.75rem' size={'sm'} onClick={handleClick}>
                                    {show ? <IconButton
                                        icon={<FaEye />}
                                        aria-label="Eye"
                                        variant="outline"
                                        m={2}
                                    /> : <IconButton
                                        icon={<FaEyeSlash />}
                                        aria-label="EyeSlash"
                                        variant="outline"
                                        m={2}
                                    />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Grid>
                <Stack mt={4} alignItems='center'>
                    {/*<Checkbox id="customCheck1">*/}
                    <Link color="teal.500" href="">Forgot Password ?</Link>
                    {/*</Checkbox>*/}
                    <Button bg="teal.600" onClick={SignIn} type="submit" width="full" isLoading={loading}>
                        Sign In
            </Button>
                </Stack>
                <Text mt={3} textAlign="center">
                    Please don't log In if you are not an Admin!
                </Text>
            </form>
        </Box>
    )
}

export default AdminAuth
