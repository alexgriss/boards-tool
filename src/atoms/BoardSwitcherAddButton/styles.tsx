import styled from 'styled-components';
import { theme } from '../../constants/theme';

export const SBoardSwitcherAddButton = styled.div`
  position: relative;
  z-index: 1;

  padding: 4px 12px 8px;

  font-size: 18px;
  color: ${theme.text.title};

  transition: 0.5s;

  cursor: pointer;
  user-select: none;
  scroll-margin: 150px;

  &::after {
    position: absolute;
    content: '';
    top: calc(50% - 2px);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    width: calc(100% - 12px);
    height: calc(100% - 12px);

    border-radius: 4px;
  }

  &:hover {
    &::after {
      background-color: ${theme.elements.button.hover};
    }
  }

  &:active {
    &::after {
      background-color: ${theme.elements.button.active};
    }
  }
`;
