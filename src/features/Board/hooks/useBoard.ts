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

import { TCardGroups } from '@/entities';
import { generateRandomString, scrollIntoView } from '@/shared/utils';

import { useCollisionDetectionStrategy } from './useCollisionDetectionStrategy';
import { coordinateGetter } from './coordinateGetter';

interface IUseBoard {
  cards: TCardGroups;
  setCards: Dispatch<SetStateAction<TCardGroups>>;
  cardGroups: UniqueIdentifier[];
  setCardGroups: Dispatch<SetStateAction<UniqueIdentifier[]>>;
}

export const useBoard = ({
  cards,
  setCards,
  cardGroups,
  setCardGroups,
}: IUseBoard) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [lastActiveId, setLastActiveId] = useState<UniqueIdentifier | null>(
    cardGroups[0]
  );

  const recentlyMovedToNewContainer = useRef(false);

  const [clonedItems, setClonedItems] = useState<TCardGroups | null>(null);

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
    cards,
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setLastActiveId(active.id);
    setClonedItems(cards);
  };

  const findContainer = (id: UniqueIdentifier) => {
    if (id in cards) {
      return id;
    }

    return Object.keys(cards).find((key) =>
      cards[key].find((item) => item.id === id)
    );
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in cards) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setCards((items) => {
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
    if (active.id in cards && over?.id) {
      setCardGroups((containers) => {
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
      const activeItem = cards[activeContainer].find(
        (item) => item.id === active.id
      );
      const activeIndex = activeItem
        ? cards[activeContainer].indexOf(activeItem)
        : -1;
      const overItem = cards[overContainer].find((item) => item.id === overId);
      const overIndex = overItem ? cards[overContainer].indexOf(overItem) : -1;

      if (activeIndex !== overIndex) {
        setCards((items) => ({
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
      setCards(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const activeCard = Object.values(cards)
    .flat()
    .find((item) => item.id === activeId);

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [cards]);

  const addNewCard = (cardGroupId: string) => {
    const newCardId = generateRandomString();

    setCards((prev) => ({
      ...prev,
      [cardGroupId]: [
        ...prev[cardGroupId],
        {
          id: newCardId,
          title: `Card #${newCardId}`,
        },
      ],
    }));
  };

  const addNewCardGroup = () => {
    const newCardId = generateRandomString();

    setCards((prev) => ({
      ...prev,
      [newCardId]: [],
    }));

    setCardGroups((prev) => [...prev, newCardId]);

    setLastActiveId(null);
  };

  useEffect(() => {
    const boardElement = boardRef.current?.children.namedItem(
      lastActiveId
        ? String(lastActiveId)
        : String(cardGroups[cardGroups.length - 1])
    );

    if (boardElement) {
      scrollIntoView(boardElement);
    }
  }, [cardGroups, lastActiveId]);

  return {
    boardRef,

    sensors,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,

    activeId,
    activeCard,

    addNewCard,
    addNewCardGroup,
  };
};
