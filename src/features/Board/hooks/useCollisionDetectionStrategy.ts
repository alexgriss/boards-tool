import { MutableRefObject, useCallback, useRef } from 'react';

import {
  CollisionDetection,
  UniqueIdentifier,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core';

import { TCard } from '@/entities';

interface IUseCollisionDetectionStrategy {
  recentlyMovedToNewContainer: MutableRefObject<boolean>;
  activeId: UniqueIdentifier | null;
  cards: Record<string, TCard[]>;
}

export const useCollisionDetectionStrategy = ({
  recentlyMovedToNewContainer,
  activeId,
  cards,
}: IUseCollisionDetectionStrategy) => {
  const lastOverId = useRef<UniqueIdentifier | null>(null);

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in cards) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in cards
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);

      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);

      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in cards) {
          const containerItems = cards[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.find((item) => container.id === item.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, cards, recentlyMovedToNewContainer]
  );

  return {
    collisionDetectionStrategy,
  };
};
