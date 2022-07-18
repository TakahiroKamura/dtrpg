import { Box, Button, Container, Flex, Grid, GridItem, useDisclosure } from "@chakra-ui/react";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useState } from "react";

interface Scenario {
    name: string;
    level: number;
    overview: string;
}

export const ScenarioSelect = () => {

    const [selectedOverview, setSelectedOverview] = useState<Scenario>({
        name: '',
        level: 0,
        overview: '',
    });

    const openModalOverview = (props: Scenario) => {
        setSelectedOverview({
            name: props.name,
            level: props.level,
            overview: props.overview,
        });
        onOpen();
    };

    const scenarioList: Scenario[] = [
        {
            name: '始まりの原野',
            level: 1,
            overview: '草原に生息するスライムを狩ろう。',
        },
        {
            name: '蛮族の砦',
            level: 2,
            overview: 'オークが住む森へ行こう。',
        },
    ];

    const { isOpen, onOpen, onClose } = useDisclosure();

    const ModalComponent = () => {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedOverview.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>推奨レベル:{selectedOverview.level}</p>
                        <p>{selectedOverview.overview}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

    return (
        <Container>
            <Grid>
                {scenarioList.map((item, index) => {
                    return (
                        <GridItem key={index}>
                            <Flex>
                                <Box width="240px">
                                    {item.name}
                                </Box>
                                <Box width="120px">
                                    <Button colorScheme="green" variant="outline" onClick={
                                        () => openModalOverview(
                                            { name: item.name, level: item.level, overview: item.overview })}>詳細</Button>
                                </Box>
                                <Box width="120px">
                                    <Button colorScheme="blue">出発</Button>
                                </Box>
                            </Flex>
                        </GridItem>
                    );
                })}
            </Grid >
            <ModalComponent />
        </Container >
    );
};