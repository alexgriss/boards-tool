import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { TBoard } from '@/entities';

interface IUseBoardSwitcherItem {
  boards: TBoard[];
  itemIndex: number;
  moveCard: (dragIndex: number | undefined, hoverIndex: number) => void;
}

export const useBoardSwitcherItem = ({
  boards,
  itemIndex,
  moveCard,
}: IUseBoardSwitcherItem) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'board',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (_, monitor) => {
      if (!ref.current) {
        return;
      }

      const draggedBoard = boards.find(
        (_, index) =>
          index === (monitor.getItem() as Record<'index', number>).index
      );

      const dragIndex = draggedBoard ? boards.indexOf(draggedBoard) : undefined;
      const hoverIndex = itemIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 4;

      const clientOffset = monitor.getClientOffset() || { x: 0 };

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (
        dragIndex !== undefined &&
        dragIndex < hoverIndex &&
        hoverClientX < hoverMiddleX
      ) {
        return;
      }

      if (
        dragIndex !== undefined &&
        dragIndex > hoverIndex &&
        hoverClientX > hoverMiddleX
      ) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      console.log('moved');

      (monitor.getItem() as Record<'index', number>).index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'board',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    drag(drop(ref));
  }, [drag, drop]);

  return {
    handlerId,
    isDragging,
    ref,
  };
};
