import {
  // Board,
  BoardPicker,
} from '@/features';

import { useBoardsPage } from './hooks';

export const BoardsPage = () => {
  const {
    // userData,

    updateUserMutation,

    activeBoardId,
    setActiveBoardId,
  } = useBoardsPage();

  return (
    <>
      <BoardPicker
        updateUserMutation={updateUserMutation}
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />

      {/* <Board
        cards={cards}
        setCards={setCards}
        cardGroups={cardGroups}
        setCardGroups={setCardGroups}
      /> */}
    </>
  );
};
