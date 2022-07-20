import { Button, Container } from "@chakra-ui/react";


import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Setting = () => {
    const [showError, setShowError] = useState<boolean>(false);

    const navigation = useNavigate();

    const onClickLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigation('/');
            })
            .catch(() => {
                setShowError(true);
                console.error('サインアウトに失敗しました');
            })
            .finally(() => setShowError(true));
    };

    return (
        <Container>
            <Button colorScheme="blue" variant="outline" onClick={onClickLogout}>ログアウト</Button>
        </Container>
    );
};