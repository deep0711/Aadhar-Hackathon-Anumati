import React from 'react';
import { Box, Heading } from 'native-base';

export default function Card({ m=0,mt=0, mb=0, mx=0, my=0, p=0, px=0, py=0, width, height, borderRadius="md", children }) {
    return <Box
    m={m}
    width={width}
    height={height}
    mt={mt}
    mb={mb}
    mx={mx}
    my={my}
    px={px}
    py={py}
    backgroundColor="white"
    borderRadius={ borderRadius }
    shadow={1}
    borderColor="cyan.500">
        { children }
    </Box>
}