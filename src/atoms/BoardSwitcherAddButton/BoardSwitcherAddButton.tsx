import { SBoardSwitcherAddButton } from './styles';

interface IBoardSwitcherAddButton {
  onClick: () => void;
}

export const BoardSwitcherAddButton = ({
  onClick,
}: IBoardSwitcherAddButton) => (
  <SBoardSwitcherAddButton onClick={onClick}>+</SBoardSwitcherAddButton>
);
