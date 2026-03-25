import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { apiConnector } from "../apiConnector";
import { friendRoutes } from "../api";
import { addFriend, setFriends } from "../../store/slices/profileSlice";
import { saveFriends } from "../storage/friendsStorage";

const { FIND_FRIEND, FRIEND_LIST } = friendRoutes;

export const findFriend = (identifier: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const response = await apiConnector("POST", FIND_FRIEND, {
        identifier,
      });
      if (!response.data.success) throw new Error("Fuck");
      dispatch(addFriend(response.data.friend));
      saveFriends(getState().profile.friends);
    } catch (error) {
      console.log(error);
    }
  };
};


export const findSortedFriendList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector("GET", 
        FRIEND_LIST
      );

      if(!response.data.success)  throw new Error("Errrooror");
      const friends = response.data.friends;

      dispatch(setFriends(friends));
      saveFriends(friends);
    } catch (error) {
      console.log(error);
    }
  }
}

