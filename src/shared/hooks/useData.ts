import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IUseData<T> {
  queryKey: string;
  getEntities: () => Promise<T[]>;
  createEntity: (entity: T) => Promise<T>;
  updateEntity: (entity: T) => Promise<T>;
  removeEntity: (id: string) => Promise<T>;
  removeEntities: () => Promise<void>;
  setActiveEntityId: (id: string) => void;
}

export const useData = <T extends { id: string }>({
  queryKey,
  getEntities,
  createEntity,
  updateEntity,
  removeEntity,
  removeEntities,
  setActiveEntityId,
}: IUseData<T>) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: getEntities,
  });

  const createEntityMutation = useMutation({
    mutationFn: (entity: T) => createEntity(entity),
    onMutate: async (entity) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const prev = queryClient.getQueryData([queryKey]);

      setActiveEntityId(entity.id);

      queryClient.setQueryData([queryKey], (prev?: T[]) =>
        prev ? [...prev, entity] : [entity]
      );

      return { prev };
    },
    onError: (err, entity, context) => {
      console.log(`create ${queryKey} error: `, err);

      queryClient.setQueryData([queryKey], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const updateEntityMutation = useMutation({
    mutationFn: (entity: T) => updateEntity(entity),
    onMutate: async (entity) => {
      await queryClient.cancelQueries({ queryKey: [queryKey, entity.id] });

      const prev = queryClient.getQueryData([queryKey, entity.id]);

      queryClient.setQueryData([queryKey, entity.id], entity);

      return { prev, entity };
    },
    onError: (err, entity, context) => {
      console.log(`update ${queryKey} with ${entity.id} error: `, err);

      queryClient.setQueryData([queryKey, context?.entity.id], context?.prev);
    },
    onSettled: (entity) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, entity?.id] });
    },
  });

  const removeEntityMutation = useMutation({
    mutationFn: (id: string) => removeEntity(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries([queryKey, id]);

      const prev: T[] | undefined = queryClient.getQueryData([queryKey, id]);

      setActiveEntityId(prev ? prev[0].id : '');

      queryClient.setQueryData(
        [queryKey, id],
        (prev?: T[]) => prev?.filter((entity) => entity.id !== id)
      );

      return { prev: prev };
    },
    onError: (err, id, context) => {
      console.log(`remove ${queryKey} with ${id} error: `, err);

      queryClient.setQueryData([queryKey, id], context?.prev);
    },
    onSettled: (entity, error, id) => {
      queryClient.invalidateQueries([queryKey, id]);
    },
  });

  const removeEntitiesMutation = useMutation({
    mutationFn: removeEntities,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const prev = queryClient.getQueryData([queryKey]);

      queryClient.setQueryData([queryKey], () => []);

      return { prev };
    },
    onError: (err, data, context) => {
      console.log(`remove ${queryKey} error: `, err);
      queryClient.setQueryData([queryKey], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return {
    data,
    isLoading,
    isError,

    createEntityMutation,
    updateEntityMutation,
    removeEntityMutation,
    removeEntitiesMutation,
  };
};
