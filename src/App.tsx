import { Box, ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { BaseCamp } from './Game/BaseCamp';
import { Title } from './Game/Title';
import './Styles/common.scss';

function App() {
  return (
    <ChakraProvider>
      <Box bg="gray" w="960px" h="540px">
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/basecamp" element={<BaseCamp />} />
        </Routes>
      </Box>
    </ChakraProvider >
  );
}

export default App;
