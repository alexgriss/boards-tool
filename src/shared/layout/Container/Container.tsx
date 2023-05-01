import { SContainer } from './styled';

interface IContainer {
  children: React.ReactNode;
}

export const Container = ({ children }: IContainer) => (
  <SContainer>{children}</SContainer>
);
