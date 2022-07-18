import { Button, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Setting = () => {
    const navigation = useNavigate();

    const onClickLogout = () => {
        navigation('/');
    };

    return (
        <Container>
            <Button colorScheme="blue" variant="outline" onClick={onClickLogout}>ログアウト</Button>
        </Container>
    );
};