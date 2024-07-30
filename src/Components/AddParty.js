import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import { useToast } from '@chakra-ui/toast'
import axios from 'axios'




function AddParty({ user, setUser, onClose, addPartyToList }) {
    const [name, setName] = useState('')
    const [initials, setInitials] = useState('')
    const [logo, setLogo] = useState('')
    const [loading, setLoading] = useState(false)

    const Notify = useToast()

    const handlePicChange = (event) => {
        UploadPicture(event.target.files[0])
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
                    setLogo(response.data.url)
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

    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!name || !initials || !logo) {
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
            const response = await axios.post(`/party/`, {
                name, initials, logo
            }, config);
            console.log(response)
            addPartyToList(response.data);
            //addNewCandidate(response.data, category);
            Notify({
                title: 'Party added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false);
            onClose()
        } catch (error) {
            Notify({
                title: error.response.data.message || 'Error adding Party',
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
                <FormControl id='name'>
                    <FormLabel>Party Name</FormLabel>
                    <Input placeholder='party name' value={name} onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl >
                    <FormLabel>Initials</FormLabel>
                    <Input placeholder='enter initials' value={initials} onChange={(e) => setInitials(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Party Logo</FormLabel>
                    <Input type='file' p={1.5} accept='image/*' onChange={handlePicChange} />
                </FormControl>
                <Button type='submit' w='7rem' mt={4} colorScheme='teal' variant='solid' isLoading={loading}>
                    Add
                </Button>
            </form>
        </Box>
    )
}

export default AddParty
