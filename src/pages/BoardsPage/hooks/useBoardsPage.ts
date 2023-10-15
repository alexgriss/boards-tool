import { useState } from 'react';

import { useUserData } from './useUserData';

export const useBoardsPage = () => {
  const {
    data: userData,
    // isLoading,
    // isError,

    updateUserMutation,
  } = useUserData();

  const [activeBoardId, setActiveBoardId] = useState(
    userData ? userData.items[0].id : ''
  );

  return {
    userData,

    updateUserMutation,

    activeBoardId,
    setActiveBoardId,
  };
};
