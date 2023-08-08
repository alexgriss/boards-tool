import { Plus } from '@/shared/ui';

import { AddCardButtonWrapper } from './styled';

interface IAddCardButton {
  onClick: () => void;
}

export const AddCardButton = ({ onClick }: IAddCardButton) => (
  <AddCardButtonWrapper onClick={onClick}>
    <Plus style={{ marginRight: '6px' }}>+</Plus>Add a card
  </AddCardButtonWrapper>
);
