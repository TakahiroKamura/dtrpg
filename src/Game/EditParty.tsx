import { Box, Checkbox, Container, Grid, GridItem, PopoverTrigger } from "@chakra-ui/react";

import {
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader
} from '@chakra-ui/react';
import React, { useState } from "react";

import { Character } from '../Types/common';

interface Check {
    name: string;
    value: boolean;
}

export const EditParty = () => {
    const [checkCount, setCheckCount] = useState<number>(0);
    const [checkManager, setCheckManager] = useState<Check[]>([]);

    const characterList: Character[] = [
        {
            name: '一郎',
            gender: '男',
            age: 0,
            job: '',
            paramType: '標準',
            weaponType: '近接',
            hp: 10,
            pow: 3,
            int: 3,
            agi: 3,
            skills: [],
        },
        {
            name: '二郎',
            gender: '男',
            age: 0,
            job: '',
            paramType: '標準',
            weaponType: '近接',
            hp: 10,
            pow: 3,
            int: 3,
            agi: 3,
            skills: [],
        },
        {
            name: '三郎',
            gender: '男',
            age: 0,
            job: '',
            paramType: '標準',
            weaponType: '近接',
            hp: 10,
            pow: 3,
            int: 3,
            agi: 3,
            skills: [],
        },
        {
            name: '四郎',
            gender: '男',
            age: 0,
            job: '',
            paramType: '標準',
            weaponType: '近接',
            hp: 10,
            pow: 3,
            int: 3,
            agi: 3,
            skills: [],
        },
        {
            name: '五郎',
            gender: '男',
            age: 0,
            job: '',
            paramType: '標準',
            weaponType: '近接',
            hp: 10,
            pow: 3,
            int: 3,
            agi: 3,
            skills: [],
        },
    ];

    const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ([...checkManager].filter((item) => item.name === e.target.name).length > 0) {
            let tempArray = [...checkManager].filter((item) => item.name !== e.target.name)
            setCheckManager(tempArray);
        } else {
            setCheckManager([...checkManager, {
                name: e.target.name,
                value: true,
            }]);
        }
    };

    const CharacterDetail = (character: any) => {
        return (
            <Popover key={character.props.name} trigger="hover">
                <PopoverTrigger>
                    <p>{character.props.name} {character.props.gender}/{character.props.age}歳 {character.props.paramType}/{character.props.weaponType}</p>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{character.props.name}</PopoverHeader>
                    <PopoverBody>
                        <p>{character.props.gender}/{character.props.age}歳/{character.props.job}</p>
                        <p>{character.props.paramType}/{character.props.weaponType}</p><p>HP:{character.props.hp}</p>
                        <p>筋力・体力:{character.props.pow}/知力・精神:{character.props.int}/器用・敏捷:{character.props.agi}</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <Container>
            <Box>
                <Grid>
                    {characterList.map((character, index) => {
                        if (checkManager.length < 4 || checkManager.find(item => item.name === character.name)) {
                            return (
                                <GridItem key={index}>
                                    <Checkbox name={character.name} onChange={onChangeCheck} ><CharacterDetail props={character} /></Checkbox>
                                </GridItem>
                            );
                        } else {
                            return (
                                <GridItem key={index}>
                                    <Checkbox name={character.name} isDisabled onChange={onChangeCheck} ><CharacterDetail props={character} /></Checkbox>
                                </GridItem>
                            );
                        }
                    })}
                </Grid>
            </Box>
            残り参加可能人数:{4 - checkManager.length}人
        </Container >
    );
};