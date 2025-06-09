import type { AppDispatch } from "../../store/store";
import { apiConnector } from "../apiConnector";
import { friendRoutes } from "../api";
import { addFriend } from "../../store/slices/profileSlice";

const { FIND_FRIEND } = friendRoutes;

export const findFriend = (identifier: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiConnector("POST", FIND_FRIEND, {
        identifier,
      });
      console.log(response);
      if (!response.data.success) throw new Error("Fuck");
      dispatch(addFriend(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

