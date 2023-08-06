import { TBoard } from '@/entities';
import { Text } from '@/widgets';

import { SBoardSwitcherItem, SIcon } from './styled';
import { useBoardSwitcherItem } from './hooks';

import ColumnsIcon from './icons/columns-icon.svg';

interface IBoardSwitcherItem {
  board: TBoard;
  boards: TBoard[];
  isActive: boolean;
  onClick: (board: TBoard) => void;
  moveCard: (dragIndex: number | undefined, hoverIndex: number) => void;
}

export const BoardSwitcherItem = ({
  board,
  boards,
  isActive,
  onClick,
  moveCard,
}: IBoardSwitcherItem) => {
  const { isDragging, ref, handlerId } = useBoardSwitcherItem({
    boards,
    itemIndex: boards.indexOf(board),
    moveCard,
  });

  return (
    <SBoardSwitcherItem
      ref={ref}
      $isActive={isActive}
      $isDragging={isDragging}
      onClick={() => onClick(board)}
      data-handler-id={handlerId}
    >
      <SIcon
        width={20}
        height={20}
        icon={<ColumnsIcon />}
        $isActive={isActive}
      />
      <Text size="s" color={isActive ? 'main' : 'title'}>
        {board.title}
        {board.id !== 0 && ` (${board.id})`}
      </Text>
    </SBoardSwitcherItem>
  );
};
