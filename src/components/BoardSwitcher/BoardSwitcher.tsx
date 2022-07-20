import { BoardSwitcherAddButton, BoardSwitcherItem } from '@/atoms';
import { useBoardsSwitcher } from './hooks';
import { SBoardSwitcher } from './styles';

export const BoardSwitcher = () => {
  const {
    boards,
    addNewBoard,
    activeBoardId,
    RSBoardSwitcher,
    onBoardItemClick,
  } = useBoardsSwitcher();

  return (
    <SBoardSwitcher ref={RSBoardSwitcher}>
      {boards.map((board) => (
        <BoardSwitcherItem
          key={board.id}
          board={board}
          isActive={activeBoardId === board.id}
          onClick={onBoardItemClick(board.id)}
        />
      ))}
      <BoardSwitcherAddButton onClick={addNewBoard} />
    </SBoardSwitcher>
  );
};
