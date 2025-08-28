import type { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiConnector";
import { friendRoutes } from "../api";
import { addFriend, setFriends } from "../../store/slices/profileSlice";

const { FIND_FRIEND, FRIEND_LIST } = friendRoutes;

export const findFriend = (identifier: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector("POST", FIND_FRIEND, {
        identifier,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Fuck");
      dispatch(addFriend(response.data.friend));
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
      console.log(response);
      if(!response.data.success)  throw new Error("Errrooror");
      const friends = response.data.friends;

      dispatch(setFriends(friends));
    } catch (error) {
      console.log(error);
    }
  }
}

