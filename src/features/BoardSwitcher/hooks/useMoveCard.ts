import { TBoard } from '@/entities';

interface IUseMoveCard {
  boardsState: Array<TBoard>;
  setBoardsState: React.Dispatch<React.SetStateAction<Array<TBoard>>>;
}

export const useMoveCard = ({ boardsState, setBoardsState }: IUseMoveCard) => {
  const moveCard = (dragIndex: number | undefined, hoverIndex: number) => {
    setBoardsState((prevState: Array<TBoard>) => {
      if (dragIndex !== undefined && boardsState[dragIndex]) {
        const dragItem = prevState[dragIndex];

        const newBoardsArray =
          dragIndex > hoverIndex
            ? [
                ...prevState.slice(0, hoverIndex),
                dragItem,
                ...prevState.slice(hoverIndex, dragIndex),
                ...prevState.slice(dragIndex + 1),
              ]
            : [
                ...prevState.slice(0, dragIndex),
                ...prevState.slice(dragIndex + 1, hoverIndex + 1),
                dragItem,
                ...prevState.slice(hoverIndex + 1),
              ];

        return newBoardsArray;
      }

      return prevState;
    });
  };

  return {
    moveCard,
  };
};
