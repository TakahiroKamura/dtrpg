import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CharaCreate } from './CharaCreate';
import { EditParty } from './EditParty';
import { ScenarioSelect } from './ScenarioSelect';

export const BaseCamp = () => {
    const navigation = useNavigate();

    return (
        <Center>
            <Container bg="white" minW='80%'>
                <Box>
                    <Tabs>
                        <TabList>
                            <Tab>キャラクターの作成</Tab>
                            <Tab>パーティーの編成</Tab>
                            <Tab>シナリオ選択</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <CharaCreate />
                            </TabPanel>
                            <TabPanel>
                                <EditParty />
                            </TabPanel>
                            <TabPanel>
                                <ScenarioSelect />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Center>
    );
};