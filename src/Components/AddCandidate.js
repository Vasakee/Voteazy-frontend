import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
//import { Category } from '../../../Model/VoteSchema'

function AddCandidate({ user, setUser, addNewCandidate, onClose }) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [party, setParty] = useState('')
    const [parties, setParties] = useState([])
    const [states, setStates] = useState([])
    const [state, setState] = useState('')
    const [localGov, setLocalGov] = useState([])
    const [locals, setLocals] = useState('')
    const [profilePic, setProfilePic] = useState('');
    const [loading, setLoading] = useState(false)

    const Notify = useToast()

    const handlePicChange = (event) => {
        UploadPicture(event.target.files[0]);
    };
    const handlePartyChange = (event) => {
        setParty(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const UploadPicture = (Picture) => {
        setLoading(true)
        if (Picture === undefined) {
            Notify({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        }
        if (Picture.type === "image/jpg" || Picture.type === "image/png" || Picture.type === "image/jpeg") {
            const formData = new FormData()
            formData.append('file', Picture)
            formData.append('upload_preset', 'voteasy')

            axios.post('https://api.cloudinary.com/v1_1/dtzvbij00/image/upload', formData)
                .then((response) => {
                    setProfilePic(response.data.url)
                    console.log(response.data.url)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            Notify({
                title: 'Please select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setLoading(false)
        }
    }
    useEffect(() => {
        FetchStates()
        FetchParties()
    }, [])

    const FetchParties = async () => {
        try {
            const response = await axios.get('/party/')
            setParties(response.data)
            console.log(response.data)
            console.log(user)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (state) {
            FetchlocalGov(state)
        } else {
            setLocalGov([])
            setLocals('')
        }
    }, [state])
    const FetchStates = async () => {
        try {
            const response = await axios.get('https://vasconaija.onrender.com/')
            //const data = await response.json()
            //console.log(response.data)
            setStates(response.data)
            console.log(states)
        } catch (error) {
            console.log(error.message)
        }
    }
    const FetchlocalGov = async () => {
        try {
            const response = await axios.get(`https://vasconaija.onrender.com/${state}`)
            // console.log(response.data.localGovernments)
            setLocalGov(response.data.localGovernments)
        } catch (error) {
            console.log('error fetching local Governments')
        }
    }

    const handleState = (e) => {
        const selectedState = e.target.value
        setState(selectedState)
    }

    const handleLocalGov = (e) => {
        setLocals(e.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!name || !category || !party || !state || !localGov || !profilePic) {
            Notify({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false)
            return;
        }
        try {
            const token = user.token
            console.log(token)
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
            }
            const response = await axios.post(`/candidates/${category}`, {
                name, party, state, localGovernment: locals, votes: 0, Pic: profilePic
            }, config);
            console.log(response)
            addNewCandidate(response.data, category);
            Notify({
                title: 'Candidate added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false);
            onClose()
        } catch (error) {
            Notify({
                title: 'Error adding candidate',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            console.log(error.message)
            setLoading(false);
        }
    }

    return (
        <Box>
            <form onSubmit={submitForm}>
                <FormControl id="category" mb={4} isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        placeholder="--Select Category--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                    >
                        <option value="President">President</option>
                        <option value="Governor">Governor</option>
                        <option value="Chairman">Chairman</option>
                    </Select>
                </FormControl>
                <FormControl id="song-name" mb={4} isRequired>
                    <FormLabel>Candidate Name</FormLabel>
                    <Input placeholder="candidate Name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl id="Party" mb={4} isRequired>
                    <FormLabel>Political Party</FormLabel>
                    <Select
                        id="State Of Origin"
                        name="State Of Origin"
                        //autoComplete="country"
                        value={party}
                        onChange={handlePartyChange}
                        placeholder="--Select Political Party--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        {loading ? (
                            <option>Loading ...</option>
                        ) : (
                            parties.map((part) => (
                                <option key={part.id} value={part.id}>{part.name}</option>
                            ))
                        )}
                    </Select>
                </FormControl>
                <FormControl id="state" mb={4} isRequired>
                    <FormLabel>State</FormLabel>
                    <Select
                        id="State Of Origin"
                        name="State Of Origin"
                        //autoComplete="country"
                        value={state}
                        onChange={handleState}
                        placeholder="--Select state of Origin--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        {loading ? (
                            <option>Loading...</option>
                        ) : (
                            states.map((state) => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))
                        )}
                    </Select>
                </FormControl>
                <FormControl id="localGoverment" mb={4} isRequired>
                    <FormLabel>Local Government</FormLabel>
                    <Select
                        id="localGovernment"
                        name="localGovernment"
                        value={locals}
                        onChange={handleLocalGov}
                        placeholder="--Select LocalGov--"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md">
                        {loading ? (
                            <option>Loading...</option>
                        ) : (
                            localGov.map((local) => (
                                <option key={local.id} value={local.name}> {local.name}</option>
                            ))
                        )}
                    </Select>
                </FormControl>
                <FormControl id="photo" mb={4} isRequired>
                    <FormLabel>Candidate Photo</FormLabel>
                    <InputGroup>
                        <Input type="file" p={1.5} accept="image/*" onChange={handlePicChange} />
                    </InputGroup>
                </FormControl>
                <Button
                    type="submit"
                    w="7rem"
                    mt={4}
                    colorScheme="teal"
                    variant="solid"
                    isLoading={loading}
                >
                    Upload
                    </Button>
            </form>
        </Box>
    )
}

export default AddCandidate
