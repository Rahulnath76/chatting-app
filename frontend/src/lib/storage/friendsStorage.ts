import type { User } from "../types";

const STORAGE_KEY = "friends";

export const loadFriends = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as User[]) : [];
  } catch {
    return [];
  }
};

export const saveFriends = (friends: User[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
  } catch {
    // no-op
  }
};

export const clearFriends = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
};
