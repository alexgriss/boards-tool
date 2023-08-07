import styled from 'styled-components';

export const AddBoardButtonWrapper = styled.div`
  position: relative;
  z-index: 1;

  padding: 4px 12px 8px;

  font-size: 18px;
  color: ${({ theme }) => theme.text.title.color};

  transition: 0.5s;

  cursor: pointer;
  user-select: none;
  scroll-margin: 150px;

  &::after {
    position: absolute;
    content: '';
    top: calc(50% - 1px);
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    width: 54%;
    height: 60%;

    border-radius: 4px;
  }

  &:hover {
    &::after {
      background-color: ${({ theme }) => theme.button.hover.color};
    }
  }

  &:active {
    &::after {
      background-color: ${({ theme }) => theme.button.active.color};
    }
  }
`;
