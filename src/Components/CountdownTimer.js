import { Heading, Tag, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function CountdownTimer({ time, citizen, setCitizen, onTimeOut }) {
    const [Timer, setTimer] = useState(time)

    const navigate = useNavigate()
    const Notify = useToast()

    useEffect(() => {
        const interval = setInterval(() => {
            if (Timer > 0) {
                setTimer(prevTime => prevTime - 1)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [Timer])

    /*const handleLogout = () => {
        try {
            localStorage.removeItem('Tokenn');
            localStorage.removeItem('Citizen');
            setCitizen(null)
            Notify({
                title: 'logged out successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            })
            Navigate('/')
        } catch (error) {
            Notify({
                title: { 'An error occured': error.message },
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }*/

    useEffect(() => {
        /*if (Timer === 0) {
            const auth = getAuth()
            signOut(auth)
                .then(() => {
                    console.log('logged out')
                    navigate('/')
                })
                .catch(error => {
                    console.log(error)
                })
        }*/
        if (Timer === 240) {
            Notify({
                title: 'You have 4 minutes remaining!!!',
                status: 'info',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
        if (Timer === 120) {
            Notify({
                title: 'You have 2 minutes remaining!!!',
                status: 'warning',
                duration: 10000,
                isClosable: true,
                position: 'top-right'
            })
        }
        if (Timer === 0) {
            onTimeOut()
        }
    }, [Timer, navigate, Notify, onTimeOut])

    const minutes = Math.floor(Timer / 60)
    const seconds = Timer % 60

    return (
        <div>
            <Heading as='h2' size={'lg'} colorScheme='Teal' color='teal' mb={6}>Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Heading>
        </div>
    )
}

export default CountdownTimer