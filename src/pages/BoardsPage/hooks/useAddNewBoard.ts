import { Dispatch, SetStateAction } from 'react';

import { TBoard } from '@/entities';
import { generateRandomString } from '@/shared/utils';

interface IUseAddNewBoard {
  setBoards: Dispatch<SetStateAction<TBoard[]>>;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
}

export const useAddNewBoard = ({
  setBoards,
  setActiveBoardId,
}: IUseAddNewBoard) => {
  const addNewBoard = () => {
    setBoards((prevState: TBoard[]) => {
      const newBoardId = generateRandomString();

      setActiveBoardId(newBoardId);

      return [...prevState, { id: newBoardId, title: 'New Board' }];
    });
  };

  return {
    addNewBoard,
  };
};
