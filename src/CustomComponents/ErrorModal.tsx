import { Button } from '@chakra-ui/react';

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

export type Error = {
    header: string;
    body: JSX.Element;
    isOpen: boolean;
}

export const ErrorModal = (props: any) => {
    return (
        <Modal isOpen={props.error.isOpen} onClose={() => props.onCloseErrorModal(false)}>

            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.error.header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {props.error.body}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={() => props.onCloseErrorModal(false)}>閉じる</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};