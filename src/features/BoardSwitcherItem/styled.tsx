import styled from 'styled-components';

import { Icon } from '@/widgets';

interface ISBoardSwitcherItem {
  $isActive: boolean;
  $isDragging: boolean;
}

export const SBoardSwitcherItem = styled.div<ISBoardSwitcherItem>`
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: 20px auto;
  column-gap: 4px;
  align-items: end;

  padding: 4px 8px 8px;

  border-bottom: 2px solid
    ${({ $isActive, theme }) => ($isActive ? theme.text.main : 'transparent')};

  opacity: ${({ $isDragging }) => ($isDragging ? 0 : 1)};

  transition: 0.3s;
  transition-property: border-bottom;

  cursor: pointer;
  user-select: none;
  scroll-margin: 50px;

  &::after {
    position: absolute;
    content: '';
    top: calc(50% - 2px);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    width: calc(100% - 4px);
    height: calc(100% - 4px);

    border-radius: 4px;

    background-color: transparent;

    transition: 0.3s;
  }

  &:hover {
    &::after {
      background-color: ${({ theme }) => theme.elements.button.hover};
    }
  }

  &:active {
    &::after {
      background-color: ${({ theme }) => theme.elements.button.active};
    }
  }
`;

export const SIcon = styled(Icon).attrs<{ $isActive: boolean }>(
  ({ $isActive, theme }) => ({
    fill: $isActive ? theme.text.main : theme.text.title,
  })
)``;
