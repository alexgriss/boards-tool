import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const SBoardSwitcher = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;

  border-bottom: 1px solid ${theme.attributes.border};

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
