import { SContainer } from './styles';

interface IContainer {
  children: React.ReactNode;
}

export const Container = ({ children }: IContainer) => (
  <SContainer>{children}</SContainer>
);
