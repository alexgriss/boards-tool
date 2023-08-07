import { Board, BoardPicker } from '@/features';

import { useBoardsPage } from './hooks';

export const BoardsPage = () => {
  const {
    boards,
    setBoards,
    addNewBoard,
    activeBoardId,
    setActiveBoardId,

    boardItems,
    setBoardItems,
    boardGroups,
    setBoardGroups,
  } = useBoardsPage();

  return (
    <>
      <BoardPicker
        boards={boards}
        setBoards={setBoards}
        addNewBoard={addNewBoard}
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />

      <Board
        boardItems={boardItems}
        setBoardItems={setBoardItems}
        boardGroups={boardGroups}
        setBoardGroups={setBoardGroups}
      />
    </>
  );
};
