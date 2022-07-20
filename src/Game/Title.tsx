import { Button, Container, Text } from "@chakra-ui/react";

import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/setupDatabase';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error, ErrorModal } from "../CustomComponents/ErrorModal";

export const Title = () => {
    const navigation = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<Error>({
        header: '',
        body: (<p></p>),
        isOpen: false,
    });

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onClickCreate = async () => {

        if (!validateUserInfo()) {
            setError({
                header: '新規登録エラー',
                body: (<><p>メールアドレスまたはパスワードが不正です。</p><p>パスワードは半角英数6桁以上で設定してください。</p></>),
                isOpen: true,
            });
            return;
        }

        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        // 既に存在するメールアドレス
        if (docSnap.exists()) {
            setError({
                header: 'メールアドレス重複エラー',
                body: (<><p>指定されたメールアドレスは既に使用されています。</p><p>別のメールアドレスを指定してください。</p></>),
                isOpen: true,
            });
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                await setDoc(doc(db, "users", email), {
                    id: email,
                }).then(() => {
                    navigation('/basecamp');
                });
            })
            .catch(() => {
                // エラーモーダルを表示
                setError({
                    header: '登録エラー',
                    body: (<><p>ログインに失敗しました。</p><p>メールアドレスとパスワードを確認してください。</p></>),
                    isOpen: true,
                });
            });
    };

    const onClickLogin = () => {
        if (!validateUserInfo()) {
            setError({
                header: 'バリデーションエラー',
                body: <p>メールアドレスまたはパスワードが不正です。</p>,
                isOpen: true,
            });
            return;
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation('/basecamp');
            })
            .catch(() => {
                setError({
                    header: '',
                    body: (<p></p>),
                    isOpen: true,
                });
            });
    };

    const onCloseErrorModal = (e: boolean) => {
        setError({
            header: '',
            body: (<p></p>),
            isOpen: e,
        });
    };

    const validateUserInfo = (): boolean => {
        if (!email.match('[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9_-]+')) {
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
            <ErrorModal
                onCloseErrorModal={(e: boolean) => onCloseErrorModal(e)}
                error={error}
            />
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
        </Container >
    );
};