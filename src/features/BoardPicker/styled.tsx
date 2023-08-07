import styled from 'styled-components';

export const BoardPickerWrapper = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;

  border-bottom: 1px solid ${({ theme }) => theme.border.color};

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
