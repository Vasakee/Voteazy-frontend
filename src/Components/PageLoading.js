import { Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import React from 'react'

function PageLoading() {
    return (
        <Stack>
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
            <Skeleton height='70px' fadeDuration={1} />
        </Stack>
    )
}

export default PageLoading
