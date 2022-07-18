import { Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { CharaCreate } from './CharaCreate';
import { EditParty } from './EditParty';
import { ScenarioSelect } from './ScenarioSelect';
import { Setting } from './Setting';

export const BaseCamp = () => {
    return (
        <Center>
            <Container bg="white" minW='80%'>
                <Box>
                    <Tabs>
                        <TabList>
                            <Tab>キャラクターの作成</Tab>
                            <Tab>パーティーの編成</Tab>
                            <Tab>シナリオ選択</Tab>
                            <Tab>設定</Tab>
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
                            <TabPanel>
                                <Setting />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Center>
    );
};