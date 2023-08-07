import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

import { scrollIntoView } from '@/shared';

interface IUseClickBoardItem {
  activeBoardId: string;
  setActiveBoardId: Dispatch<SetStateAction<string>>;
  boardPickerRef: RefObject<HTMLDivElement>;
}

export const useClickBoardItem = ({
  boardPickerRef,
  activeBoardId,
  setActiveBoardId,
}: IUseClickBoardItem) => {
  const handleBoardClick = (boardId: string) => {
    setActiveBoardId(boardId);

    const boardElement = boardPickerRef.current?.children.namedItem(boardId);

    if (boardElement) {
      scrollIntoView(boardElement);
    }
  };

  useEffect(() => {
    const activeBoardElement =
      boardPickerRef.current?.children.namedItem(activeBoardId);

    if (activeBoardElement) {
      scrollIntoView(activeBoardElement);
    }
  }, [activeBoardId, boardPickerRef]);

  return {
    handleBoardClick,
  };
};
