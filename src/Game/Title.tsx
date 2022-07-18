import { Button, Container, Text } from "@chakra-ui/react";

import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/setupDatabase';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Title = () => {
    const navigation = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onClickCreate = async () => {
        if (!validateUserInfo()) {
            return;
        }

        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        // 既に存在するメールアドレス
        if (docSnap.exists()) {
            // TODO モーダル表示
            return;
        }

        // await setDoc(doc(db, "users", email), {
        //     id: email,
        //     password: password,
        // });

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                navigation('/basecamp');
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const onClickLogin = () => {
        if (!validateUserInfo()) {
            return;
        }

        navigation('/basecamp');
    };

    const validateUserInfo = (): boolean => {
        if (!email.match('[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9\._-]+')) {
            // TODO モーダル表示
            return false;
        }

        if (password.length < 6) {
            // TODO モーダル表示
            return false;
        }

        return true;
    };

    return (
        <Container bg="white" minW="80%" minH="80%">
            <Text fontSize="5xl">B.A.S.I.C. System</Text>
            <p>Version 0.0.0</p>
            <InputGroup>
                <InputLeftAddon children='メールアドレス' />
                <Input type="text" onChange={onChangeEmail} />
                <InputLeftAddon children='パスワード' />
                <Input type="password" onChange={onChangePassword} />
            </InputGroup>
            <Button colorScheme="green" onClick={onClickCreate}>新規登録</Button>
            <Button colorScheme="blue" onClick={onClickLogin}>ログイン</Button>
        </Container>
    );
};