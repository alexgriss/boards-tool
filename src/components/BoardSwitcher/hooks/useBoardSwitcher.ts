import { useState } from 'react';

interface IUseBoardsSwitcher {
  boardId: number;
}

export const useBoardSwitcher = ({ boardId }: IUseBoardsSwitcher) => {
  const [activeBoard, setActiveBoard] = useState(boardId);

  return {
    activeBoard,
    setActiveBoard,
  };
};
