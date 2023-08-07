import { TextWrapper } from './styled';
import { TTextColor, TTextSize } from './types';

interface IText {
  size: TTextSize;
  color: TTextColor;
  children: React.ReactNode;
}

export const Text = ({ size, color, children }: IText) => (
  <TextWrapper size={size} color={color}>
    {children}
  </TextWrapper>
);
