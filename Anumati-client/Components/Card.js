import React from 'react';
import { Box, Heading } from 'native-base';

export default function Card({ m=0, title, borderRadius="md", children }) {
    return <Box
    backgroundColor="white"
    borderRadius={ borderRadius }
    shadow={1}
    borderColor="cyan.500">
        { children }
    </Box>
}