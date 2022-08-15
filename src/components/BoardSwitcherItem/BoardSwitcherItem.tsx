import { theme } from '../../constants/theme';
import { TBoard } from '../../types';
import { Icon, Text } from '@/atoms';
import ColumnsIcon from './icons/columns-icon.svg';
import { SBoardSwitcherItem } from './styles';
import { useBoardSwitcherItem } from './hooks';

interface IBoardSwitcherItem {
  board: TBoard;
  isActive: boolean;
  onClick: (board: TBoard) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const BoardSwitcherItem = ({
  board,
  isActive,
  onClick,
  moveCard,
}: IBoardSwitcherItem) => {
  const { isDragging, ref, handlerId } = useBoardSwitcherItem({
    itemIndex: board.id,
    moveCard,
  });

  return (
    <SBoardSwitcherItem
      ref={ref}
      isActive={isActive}
      isDragging={isDragging}
      onClick={() => onClick(board)}
      data-handler-id={handlerId}
    >
      <Icon
        width={20}
        height={20}
        fill={isActive ? theme.text.main : theme.text.title}
        icon={<ColumnsIcon />}
      />
      <Text size="s" color={isActive ? 'main' : 'title'}>
        {board.title}
        {board.id !== 0 && ` (${board.id})`}
      </Text>
    </SBoardSwitcherItem>
  );
};
