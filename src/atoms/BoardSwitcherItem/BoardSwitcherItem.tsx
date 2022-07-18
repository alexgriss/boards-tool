import { theme } from '../../constants/theme';
import { TBoard } from '../../types';
import { Icon } from '../Icon';
import { Text } from '../Text';
import ColumnsIcon from './icons/columns-icon.svg';
import { SBoardSwitcherItem } from './styles';

interface IBoardSwitcherItem {
  board: TBoard;
  isActive: boolean;
  onClick: (board: TBoard) => void;
}

export const BoardSwitcherItem = ({
  board,
  isActive,
  onClick,
}: IBoardSwitcherItem) => (
  <SBoardSwitcherItem isActive={isActive} onClick={() => onClick(board)}>
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
