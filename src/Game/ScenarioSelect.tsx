import { Box, Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";

import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";


interface Scenario {
    name: string;
    level: number;
    overview: string;
}

export const ScenarioSelect = () => {
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

    const PopoverComponent = (scenario: any) => {
        return (
            <Popover>
                <PopoverTrigger>
                    <Button colorScheme="green" variant="outline">詳細</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{scenario.props.name}</PopoverHeader>
                    <PopoverBody>
                        <p>推奨レベル:{scenario.props.level}</p>
                        <p>{scenario.props.overview}</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
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
                                    <PopoverComponent props={item} />
                                </Box>
                                <Box width="120px">
                                    <Button colorScheme="blue">出発</Button>
                                </Box>
                            </Flex>
                        </GridItem>
                    );
                })}
            </Grid >
        </Container >
    );
};