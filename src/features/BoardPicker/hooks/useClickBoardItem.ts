import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

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
      (boardElement.parentNode as HTMLElement).scroll({
        left: (boardElement as HTMLElement).offsetLeft - 20,
        behavior: 'smooth',
      });
    }
  };

  // TODO: fix scroll behavior when user clicks on board picker item
  useEffect(() => {
    const activeBoardElement =
      boardPickerRef.current?.children.namedItem(activeBoardId);

    if (activeBoardElement) {
      (activeBoardElement.parentNode as HTMLElement).scroll({
        left: (activeBoardElement as HTMLElement).offsetLeft - 20,
        behavior: 'smooth',
      });
    }
  }, [activeBoardId, boardPickerRef]);

  return {
    handleBoardClick,
  };
};
