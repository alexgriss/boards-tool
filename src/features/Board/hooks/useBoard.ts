import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { TBoardGroups } from '@/entities';

import { useCollisionDetectionStrategy } from './useCollisionDetectionStrategy';
import { coordinateGetter } from './coordinateGetter';

interface IUseBoard {
  boardItems: TBoardGroups;
  setBoardItems: Dispatch<SetStateAction<TBoardGroups>>;
  setBoardGroups: Dispatch<SetStateAction<UniqueIdentifier[]>>;
}

export const useBoard = ({
  boardItems,
  setBoardItems,
  setBoardGroups,
}: IUseBoard) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const recentlyMovedToNewContainer = useRef(false);

  const [clonedItems, setClonedItems] = useState<TBoardGroups | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const { collisionDetectionStrategy } = useCollisionDetectionStrategy({
    recentlyMovedToNewContainer,
    activeId,
    boardItems,
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setClonedItems(boardItems);
  };

  const findContainer = (id: UniqueIdentifier) => {
    if (id in boardItems) {
      return id;
    }

    return Object.keys(boardItems).find((key) =>
      boardItems[key].find((item) => item.id === id)
    );
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in boardItems) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setBoardItems((items) => {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
        const overItem = overItems.find((item) => item.id === overId);
        const overIndex = overItem ? overItems.indexOf(overItem) : -1;
        const activeItem = activeItems.find((item) => item.id === active.id);
        const activeIndex = activeItem ? activeItems.indexOf(activeItem) : -1;

        let newIndex: number;

        if (overId in items) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item.id !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        };
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in boardItems && over?.id) {
      setBoardGroups((containers) => {
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);

        return arrayMove(containers, activeIndex, overIndex);
      });
    }

    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeItem = boardItems[activeContainer].find(
        (item) => item.id === active.id
      );
      const activeIndex = activeItem
        ? boardItems[activeContainer].indexOf(activeItem)
        : -1;
      const overItem = boardItems[overContainer].find(
        (item) => item.id === overId
      );
      const overIndex = overItem
        ? boardItems[overContainer].indexOf(overItem)
        : -1;

      if (activeIndex !== overIndex) {
        setBoardItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setBoardItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const activeBoardItem = Object.values(boardItems)
    .flat()
    .find((item) => item.id === activeId);

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [boardItems]);

  return {
    boardRef,

    sensors,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,

    activeId,
    activeBoardItem,
  };
};
