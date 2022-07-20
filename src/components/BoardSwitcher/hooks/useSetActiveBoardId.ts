import { useState } from 'react';

interface IUseBoardsSwitcher {
  boardId: number;
}

export const useSetActiveBoardId = ({ boardId }: IUseBoardsSwitcher) => {
  const [activeBoardId, setActiveBoardId] = useState(boardId);

  return {
    activeBoardId,
    setActiveBoardId,
  };
};
