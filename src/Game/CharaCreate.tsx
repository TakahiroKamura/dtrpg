import React, { useState } from 'react';

import {
    Box,
    Button,
    Container,
    Grid, GridItem,
    Radio, RadioGroup,
    Select,
    Stack,
    useDisclosure
} from '@chakra-ui/react';

import {
    Input, InputGroup, InputLeftAddon,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput, NumberInputField, NumberInputStepper
} from '@chakra-ui/react';

import {
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import '../Styles/common.scss';

import { Character } from '../Types/common';

interface ParamType {
    typeIndex: number;
    typeName: string;
}

interface Params {
    name: string;
    hp: number;
    pow: number;
    int: number;
    agi: number;
}

export const CharaCreate = () => {
    const navigation = useNavigate();

    const [name, setName] = useState<string>('');
    const [gender, setGender] = useState<string>('male');
    const [age, setAge] = useState<number>(0);
    const [job, setJob] = useState<string>('');
    const [paramType, setParamType] = useState<ParamType>({
        typeIndex: 0,
        typeName: '',
    });
    const [weaponType, setWeaponType] = useState<ParamType>({
        typeIndex: 0,
        typeName: '',
    });
    const [errorTitle, setErrorTitle] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const [displayParams, setDisplayParams] = useState<Params>({
        name: '',
        hp: 0,
        pow: 0,
        int: 0,
        agi: 0,
    });

    const paramsTypes: Params[] = [
        {
            name: '',
            hp: 0,
            pow: 0,
            int: 0,
            agi: 0,
        },
        {
            name: '標準',
            hp: 15,
            pow: 3,
            int: 3,
            agi: 3,
        },
        {
            name: '剛健',
            hp: 16,
            pow: 5,
            int: 1,
            agi: 2,
        },
        {
            name: '知略',
            hp: 14,
            pow: 2,
            int: 5,
            agi: 3,
        },
        {
            name: '機敏',
            hp: 13,
            pow: 3,
            int: 3,
            agi: 5,
        },
    ];
    const weaponTypes: string[] = [
        '近接武器',
        '射撃武器',
        '投擲武器',
    ];

    // 名前変更時
    const onChangeName = (name: React.ChangeEvent<HTMLInputElement>) => {
        setName(name.target.value);
    };

    // 性別変更時
    const onChangeSelectGender = (gender: string) => {
        setGender(gender);
    };

    // 年齢変更時
    const onChangeAge = (_: string, age: number) => {
        setAge(age);
    };

    // 職業変更時
    const onChangeJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setJob(e.target.value);
    };

    // 能力値タイプ
    const onChangeParamType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParamType({
            typeIndex: e.target.selectedIndex,
            typeName: e.target.value,
        });
        setDisplayParams(paramsTypes[e.target.selectedIndex]);
    };

    // 武器タイプ
    const onChangeWeaponType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWeaponType({
            typeIndex: e.target.selectedIndex,
            typeName: e.target.value,
        });
    };

    // 作成ボタン
    const onButtonCreate = () => {
        let passed: boolean = true;
        let message: string[] = [];
        if (name === '') {
            passed = false;
            message.push('キャラクターの名前を入力してください');
        }
        if (paramType?.typeIndex === 0) {
            passed = false;
            message.push('能力値タイプを選択してください');
        }
        if (weaponType?.typeIndex === 0) {
            passed = false;
            message.push('武器タイプを選択してください');
        }
        if (!passed) {
            setErrorTitle('入力エラー')
            setErrorMessage(message);
            onOpen();
            return;
        }
        const character: Character = {
            name: name,
            gender: gender,
            age: age,
            job: job,
            paramType: paramType.typeName,
            weaponType: weaponType.typeName,
            hp: paramsTypes[paramType.typeIndex].hp,
            pow: paramsTypes[paramType.typeIndex].pow,
            int: paramsTypes[paramType.typeIndex].int,
            agi: paramsTypes[paramType.typeIndex].agi,
            skills: [],
        };

        localStorage.setItem(name, JSON.stringify(character));
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const ModalComponent = () => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>入力エラー</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage.map((line, index) => {
                            return <p key={index}>{line}</p>;
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

    return (
        <Container bg="white">
            <Box>
                <InputGroup>
                    <InputLeftAddon children="名前" />
                    <Input onChange={onChangeName} />
                </InputGroup>

            </Box>
            <Box>
                <RadioGroup onChange={onChangeSelectGender} value={gender}>
                    <Stack direction="row">
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                        <Radio value="other">その他</Radio>
                    </Stack>
                </RadioGroup>
            </Box>
            <Box>
                <InputGroup>
                    <InputLeftAddon children="年齢" />
                    <NumberInput defaultValue={age} min={0} max={99999} onChange={onChangeAge}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </InputGroup>
            </Box>
            <Box>
                <InputGroup>
                    <InputLeftAddon children="職業" />
                    <Input onChange={onChangeJob} />
                </InputGroup>
            </Box>
            <Box>
                <Select placeholder="能力値タイプ" onChange={onChangeParamType}>
                    {paramsTypes.map((type, index) => {
                        if (index >= 1) {
                            return <option key={index} value={type.name}>{type.name}</option>
                        } else {
                            return null;
                        }
                    })}
                </Select>
            </Box>
            <Box>
                <Select placeholder="武器タイプ" onChange={onChangeWeaponType}>
                    {weaponTypes.map((type, index) =>
                        <option key={index} value={type}>{type}</option>
                    )}
                </Select>
            </Box>
            <Box>
                <Grid
                    templateRows="repeat(4, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                >
                    <GridItem>能力値</GridItem>
                    <GridItem></GridItem>
                    <GridItem>HP:{displayParams.hp}</GridItem>
                    <GridItem>MP:{0}</GridItem>
                    <GridItem>筋力・体力:{displayParams.pow}</GridItem>
                    <GridItem>知力・精神:{displayParams.int}</GridItem>
                    <GridItem>器用・敏捷:{displayParams.agi}</GridItem>
                </Grid>
            </Box>
            <Box>
                <Button colorScheme="blue" onClick={onButtonCreate}>作成</Button>
            </Box>
            <ModalComponent />
        </Container >
    );
};