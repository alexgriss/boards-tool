import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { TCardGroups } from '@/entities';
import { SortableItem } from '@/widgets';

import { CardGroup } from '../CardGroup';
import { Card } from '../Card';

import { BoardWrapper } from './styled';
import { useBoard } from './hooks';
import { AddCardGroupButton } from './ui';

interface IBoard {
  cards: TCardGroups;
  setCards: Dispatch<SetStateAction<TCardGroups>>;
  cardGroups: UniqueIdentifier[];
  setCardGroups: Dispatch<SetStateAction<UniqueIdentifier[]>>;
}

export const Board = ({
  cards,
  setCards,
  cardGroups,
  setCardGroups,
}: IBoard) => {
  const {
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
  } = useBoard({
    cards,
    setCards,
    cardGroups,
    setCardGroups,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <BoardWrapper ref={boardRef}>
        <SortableContext
          items={cardGroups}
          strategy={horizontalListSortingStrategy}
        >
          {cardGroups.map((groupId) => (
            <SortableItem key={groupId} sortableItemId={groupId}>
              {({ setNodeRef, style, attributes, listeners, isDragging }) => (
                <CardGroup
                  attributes={attributes}
                  listeners={listeners}
                  ref={setNodeRef}
                  style={style}
                  groupId={String(groupId)}
                  cardGroup={cards[groupId]}
                  isDragging={isDragging}
                  addNewCard={addNewCard}
                />
              )}
            </SortableItem>
          ))}
          <SortableItem
            key="addCardGroupButton"
            sortableItemId="addCardGroupButton"
          >
            {({ setNodeRef }) => (
              <AddCardGroupButton ref={setNodeRef} onClick={addNewCardGroup} />
            )}
          </SortableItem>
        </SortableContext>
      </BoardWrapper>

      {createPortal(
        <DragOverlay>
          {activeId ? (
            cardGroups.includes(activeId) ? (
              <CardGroup
                isDragging
                isDragOverlay
                groupId={String(activeId)}
                cardGroup={cards[activeId]}
              />
            ) : (
              <Card isDragging isDragOverlay card={activeCard} />
            )
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
