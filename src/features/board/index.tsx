import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import { TCardGroups } from '@/entities';

import { AddCardGroupButton } from '../add-card-group-button';
import { Card } from '../card';
import { CardGroup } from '../card-group';
import { SortableItem } from '../sortable-item';

import { useBoard } from './hooks';
import { BoardWrapper } from './styled';

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
      <BoardWrapper ref={boardRef} id="board">
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
