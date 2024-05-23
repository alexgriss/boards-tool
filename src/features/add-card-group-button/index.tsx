import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import { Plus } from '@/shared/ui';

import { AddCardGroupButtonWrapper } from './styled';

interface IAddCardGroupButtonView {
  style?: CSSProperties;
  onClick: () => void;
}

const AddCardGroupButtonView = (
  { style, onClick, ...props }: IAddCardGroupButtonView,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <AddCardGroupButtonWrapper
      {...props}
      style={style}
      ref={ref}
      onClick={onClick}
    >
      <Plus style={{ marginRight: '6px' }}>+</Plus>Add another card group
    </AddCardGroupButtonWrapper>
  );
};

export const AddCardGroupButton = forwardRef(AddCardGroupButtonView);
