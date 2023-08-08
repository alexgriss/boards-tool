import styled from 'styled-components';

export const AddCardGroupButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 272px;
  min-width: 272px;
  height: fit-content;

  padding: 8px;

  font-size: 14px;

  transition: 0.5s;

  color: rgba(0, 0, 0, 0.8);

  border-radius: 8px;

  cursor: pointer;
  user-select: none;

  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
