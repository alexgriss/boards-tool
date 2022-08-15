import { BoardSwitcherAddButton } from '@/atoms';
import { withDND } from '@/hocs';
import { BoardSwitcherItem } from '../BoardSwitcherItem';
import { useBoardsSwitcher } from './hooks';
import { SBoardSwitcher } from './styles';

export const BoardSwitcher = () => {
  const {
    boards,
    addNewBoard,
    activeBoardId,
    RSBoardSwitcher,
    onBoardItemClick,
    moveCard,
  } = useBoardsSwitcher();

  console.log(boards);

  const BoardSwitcherComponent = (
    <SBoardSwitcher ref={RSBoardSwitcher}>
      {boards.map((board) => (
        <BoardSwitcherItem
          key={board.id}
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
