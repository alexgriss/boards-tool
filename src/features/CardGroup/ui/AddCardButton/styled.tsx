import styled from 'styled-components';

export const AddCardButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 8px;

  font-size: 14px;

  color: rgba(0, 0, 0, 0.7);

  transition: 0.5s;

  border-radius: 8px;

  cursor: pointer;
  user-select: none;

  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 1);
  }
`;
