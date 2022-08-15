import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface IUseBoardSwitcherItem {
  itemIndex: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const useBoardSwitcherItem = ({
  itemIndex,
  moveCard,
}: IUseBoardSwitcherItem) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'board',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = (item as Record<'index', number>).index;
      const hoverIndex = itemIndex;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 4;

      const clientOffset = monitor.getClientOffset() || { x: 0 };

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      (item as Record<'index', number>).index = hoverIndex;
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
