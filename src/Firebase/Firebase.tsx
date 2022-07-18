import { Box, Button } from '@chakra-ui/react';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './setupDatabase';

export const Firebase = () => {
    const onClickSave = async () => {
        await setDoc(doc(db, 'users', 'session'), {
            first: 'Ada',
            last: 'Lovelace',
            born: 1815,
        });
    };

    const onClickUpdate = async () => {
        await updateDoc(doc(db, 'users', 'session'), {
            first: 'hoge',
            last: 'fuga',
            born: 1988,
        });
    };

    const onClickDelete = async () => {
        await deleteDoc(doc(db, 'users', 'session'));
    };

    return (
        <Box>
            <label>データベース操作のテスト</label>
            <Button onClick={onClickSave}>保存</Button>
            <Button onClick={onClickUpdate}>更新</Button>
            <Button onClick={onClickDelete}>削除</Button>
        </Box>
    );
};