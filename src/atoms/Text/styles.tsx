import styled from 'styled-components';
import { theme } from '../../constants/theme';
import { TTextColor, TTextSize } from './types';

interface ISText {
  size: TTextSize;
  color: TTextColor;
}

const sizeDict: Record<TTextSize, number> = {
  xs: 10,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
};

const colorDict: Record<TTextColor, string> = {
  ...theme.text,
};

const getFontSize = ({ size }: Pick<ISText, 'size'>) => sizeDict[size];
const getColor = ({ color }: Pick<ISText, 'color'>) => colorDict[color];

export const SText = styled.div<ISText>`
  font-size: ${getFontSize}px;
  color: ${getColor};
`;
