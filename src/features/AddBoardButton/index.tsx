import { Plus } from '@/shared/ui';

import { AddBoardButtonWrapper } from './styled';

interface IAddBoardButton {
  onClick: () => void;
}

export const AddBoardButton = ({ onClick }: IAddBoardButton) => (
  <AddBoardButtonWrapper onClick={onClick}>
    <Plus>+</Plus>
  </AddBoardButtonWrapper>
);
