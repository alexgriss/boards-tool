import { withDND } from '@/shared';
import { BoardSwitcherAddButton } from '@/widgets';

import { BoardSwitcherItem } from '../BoardSwitcherItem';

import { useBoardsSwitcher } from './hooks';
import { SBoardSwitcher } from './styled';

export const BoardSwitcher = () => {
  const {
    boards,
    addNewBoard,
    activeBoardId,
    RSBoardSwitcher,
    onBoardItemClick,
    moveCard,
  } = useBoardsSwitcher();

  const BoardSwitcherComponent = (
    <SBoardSwitcher ref={RSBoardSwitcher}>
      {boards.map((board) => (
        <BoardSwitcherItem
          key={board.id}
          boards={boards}
          board={board}
          isActive={activeBoardId === board.id}
          onClick={onBoardItemClick(board.id)}
          moveCard={moveCard}
        />
      ))}

      <BoardSwitcherAddButton onClick={addNewBoard} />
    </SBoardSwitcher>
  );

  return withDND(BoardSwitcherComponent);
};
