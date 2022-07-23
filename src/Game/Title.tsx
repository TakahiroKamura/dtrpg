import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Button, Container, Text } from "@chakra-ui/react";

import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import { doc, setDoc } from "firebase/firestore";
import { Error, ErrorModal } from "../CustomComponents/ErrorModal";
import { db } from "../Firebase/setupDatabase";

/**
 * ユーザーの登録・ログインを行うタイトル画面を描画するコンポーネント
 * @returns {JSX.Element}
 */
export const Title = () => {
    const navigation = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<Error>({
        header: '',
        body: [],
        isInvalidAccess: false,
        isOpen: false,
    });

    /**
     * 認証用のe-mailアドレスの変更を検知するイベントハンドラ
     * @param e - 入力された値
     */
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    /**
     * 認証用のe-mailアドレスの変更を検知するイベントハンドラ
     * @param e - 入力された値
     */
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    /**
     * 新規登録ボタンが押された時の処理
     * 登録情報に問題がなければユーザー登録し、ページ遷移する
     * @returns {void}
     */
    const onClickCreate = async () => {
        if (!validateUserInfo()) {
            return;
        }

        // 認証処理
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async () => {
                        await setDoc(doc(db, "users", email), {
                            id: email,
                        }).then(() => {
                            navigation('/basecamp');
                        });
                    })
                    .catch(() => {
                        setError({
                            header: '登録エラー',
                            body: [
                                'ユーザー登録に失敗しました。',
                                '入力されたメールアドレスは既に使用されている可能性があります。'
                            ],
                            isInvalidAccess: false,
                            isOpen: true,
                        });
                    });
            })
            .catch();
    };

    /**
     * ログインボタンが押された時の処理
     * ログイン情報に問題がなければユーザー認証をし、ページ遷移する
     * @returns {void}
     */
    const onClickLogin = () => {
        if (!validateUserInfo()) {
            return;
        }

        // 認証処理
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigation('/basecamp');
                    })
                    .catch(() => {
                        setError({
                            header: 'ログインエラー',
                            body: [
                                'ログインに失敗しました。',
                                '入力されたメールアドレスまたはパスワードが不正です。'
                            ],
                            isInvalidAccess: false,
                            isOpen: true,
                        });
                    });
            })
            .catch(() => console.error('ERROR'));
    };

    /**
     * エラーモーダルを閉じる処理
     * @param {boolean} e - モーダルの状態を指定するboolean型
     */
    const onCloseErrorModal = (e: boolean) => {
        setError({
            header: '',
            body: [],
            isInvalidAccess: false,
            isOpen: e,
        });
    };

    /**
     * 新規登録・ログイン用のメールアドレスとパスワードの形式をチェックする
     * エラーの場合はモーダルを表示する
     * @returns {boolean} - バリデーション結果を返す
     */
    const validateUserInfo = (): boolean => {
        if (!email.match('[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9_-]+')) {
            setError({
                header: 'メールアドレスエラー',
                body: ['入力されたメールアドレスの形式が不正です。'],
                isInvalidAccess: false,
                isOpen: true,
            });
            return false;
        }

        if (password.length < 6) {
            setError({
                header: '入力エラー',
                body: [
                    '入力されたパスワードの形式が不正です。',
                    'パスワードは半角英数6桁以上で設定してください。'
                ],
                isInvalidAccess: false,
                isOpen: true,
            });
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