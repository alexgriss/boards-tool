import { AddBoardButtonWrapper } from './styled';

interface IAddBoardButton {
  onClick: () => void;
}

export const AddBoardButton = ({ onClick }: IAddBoardButton) => (
  <AddBoardButtonWrapper onClick={onClick}>+</AddBoardButtonWrapper>
);
