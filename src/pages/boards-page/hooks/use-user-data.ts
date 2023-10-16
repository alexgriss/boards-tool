import { useMutation, useQuery } from '@tanstack/react-query';

import { getUserByUsername, TUser, updateUser } from '@/entities';

export const useUserData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', 'alexgriss'],
    queryFn: () => getUserByUsername('alexgriss'),
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: TUser) => updateUser('alexgriss', user),
  });

  return {
    data,
    isLoading,
    isError,

    updateUserMutation,
  };
};
