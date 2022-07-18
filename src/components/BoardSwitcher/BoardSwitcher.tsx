import { BoardSwitcherAddButton, BoardSwitcherItem, Text } from '../../atoms';
import { useGetBoards } from './hooks';
import { SBoardSwitcher } from './styles';

export const BoardSwitcher = () => {
  const { boards, addNewBoard, activeBoard, setActiveBoard, RSBoardSwitcher } =
    useGetBoards();

  return (
    <div>
      <SBoardSwitcher ref={RSBoardSwitcher}>
        {boards.map((board) => (
          <BoardSwitcherItem
            key={board.id}
            board={board}
            isActive={activeBoard === board.id}
            onClick={() => {
              setActiveBoard(board.id);
            }}
          />
        ))}
        <BoardSwitcherAddButton
          onClick={() => {
            addNewBoard();
          }}
        />
      </SBoardSwitcher>
      <div style={{ marginTop: 24 }} />
      <Text size="l" color="main">
        {boards[activeBoard].title} Content
        {boards[activeBoard].id !== 0 && ` (${boards[activeBoard].id})`}
      </Text>
    </div>
  );
};
