import { API_BASE_URL, create, get, remove, update } from '@/shared/api';

import { TCard } from './types';

const getCardsUrl = () => `${API_BASE_URL}/cards`;
const getCardByIdUrl = (id: string) => `${API_BASE_URL}/cards/${id}`;

export const getCardById = (id: string) => get<TCard>(getCardByIdUrl(id));

export const getCards = () => get<TCard[]>(getCardsUrl());

export const createCard = (card: TCard) => create<TCard>(getCardsUrl(), card);

export const updateCard = (id: string, card: TCard) =>
  update<TCard>(getCardByIdUrl(id), card);

export const removeCardById = (id: string) => remove<TCard>(getCardByIdUrl(id));

export const removeCards = () => remove<TCard>(getCardsUrl());
