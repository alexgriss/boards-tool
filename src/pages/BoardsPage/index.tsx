import { Board, BoardPicker } from '@/features';

import { useBoardsPage } from './hooks';

export const BoardsPage = () => {
  const {
    boards,
    setBoards,
    addNewBoard,
    activeBoardId,
    setActiveBoardId,

    cards,
    setCards,
    cardGroups,
    setCardGroups,
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
        cards={cards}
        setCards={setCards}
        cardGroups={cardGroups}
        setCardGroups={setCardGroups}
      />
    </>
  );
};
