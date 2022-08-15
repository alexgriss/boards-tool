import { TBoard } from '@/types';

interface IUseMoveCard {
  boardsState: Array<TBoard>;
  setBoardsState: React.Dispatch<React.SetStateAction<Array<TBoard>>>;
}

export const useMoveCard = ({ boardsState, setBoardsState }: IUseMoveCard) => {
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setBoardsState((prevState: Array<TBoard>) => {
      if (boardsState[dragIndex]) {
        const coppiedStateArray = [...prevState];

        const prevItem = coppiedStateArray.splice(
          hoverIndex,
          1,
          prevState[dragIndex]
        );

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      }

      return prevState;
    });
  };

  return {
    moveCard,
  };
};
