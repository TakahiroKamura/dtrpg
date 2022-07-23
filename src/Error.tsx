import { Box, Button, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
    const navigation = useNavigate();

    return (
        <Container>
            <Box bg="white">
                <p>アクセスは禁止されています。</p>
                <Button onClick={() => navigation('/')} colorScheme="red" variant="outline">トップへ戻る</Button>
            </Box>
        </Container >
    );
};