import { useAppSelector } from "../../app/store";
import { IUser } from "../../utils/interfaces";

export const useUser = () => {
  const user = useAppSelector(
    (state) => state.auth.user as unknown as IUser
  );

  return user;
};
