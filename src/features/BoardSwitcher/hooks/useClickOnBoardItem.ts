import { useEffect } from 'react';

import { scrollIntoView } from '@/shared';

interface IUseClickOnBoardItem {
  activeBoardId: number;
  setActiveBoardId: React.Dispatch<React.SetStateAction<number>>;
  RSBoardSwitcher: React.RefObject<HTMLDivElement>;
}

export const useClickOnBoardItem = ({
  RSBoardSwitcher,
  activeBoardId,
  setActiveBoardId,
}: IUseClickOnBoardItem) => {
  const onBoardItemClick = (boardId: number) => () => {
    setActiveBoardId(boardId);

    const boardElement = RSBoardSwitcher.current?.children[boardId];

    if (boardElement) {
      scrollIntoView(boardElement);
    }
  };

  useEffect(() => {
    const activeBoardElement = RSBoardSwitcher.current?.children[activeBoardId];

    if (activeBoardElement) {
      scrollIntoView(activeBoardElement);
    }
  }, [activeBoardId, RSBoardSwitcher]);

  return {
    RSBoardSwitcher,
    onBoardItemClick,
  };
};
