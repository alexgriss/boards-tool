import { Dispatch, SetStateAction } from 'react';

import {
  createBoard,
  getBoards,
  removeBoardById,
  removeBoards,
  updateBoard,
} from '@/entities';

import { useData } from '@/shared/hooks';

interface IUseBoardsData {
  setActiveBoardId: Dispatch<SetStateAction<string>>;
}

export const useBoardsData = ({ setActiveBoardId }: IUseBoardsData) => {
  const {
    data: boards = [],
    isLoading,
    isError,

    createEntityMutation: createBoardMutation,
    updateEntityMutation: updateBoardMutation,
    removeEntityMutation: removeBoardMutation,
    removeEntitiesMutation: removeBoardsMutation,
  } = useData({
    queryKey: 'boards',
    getEntities: getBoards,
    createEntity: createBoard,
    updateEntity: updateBoard,
    removeEntity: removeBoardById,
    removeEntities: removeBoards,
    setActiveEntityId: setActiveBoardId,
  });

  return {
    boards,
    isLoading,
    isError,

    createBoardMutation,
    updateBoardMutation,
    removeBoardMutation,
    removeBoardsMutation,
  };
};
