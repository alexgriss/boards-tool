import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { App } from '@/app';

import { GlobalStyle, theme } from '@/shared';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);

/* TODO:

1) Доделать квери и мутации на доски
2) Обобщить квери и мутации и распространить на группы и карточки
3) Добавить аутентификацию (базовую)
  3.1) Добавить страницу логина
  3.2) Добавить юзверей
  3.3) Реализовать стартовый флоу для нового пользователя
4) Адаптировать днд
5) Добавить удаление и редактирование сущностей
6) Потестировать оптимистичный юай
7) Пофиксить скролл при нажатии на активную сущность
8) Потестировать внешний вид, адаптивность, сценарии использования
9) Добавить расширенное редактирование полей карточки
10) Подумать над улучшением производительности апдейта сущностей при днд

*/
