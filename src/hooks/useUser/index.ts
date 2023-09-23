import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { User } from "../../interfaces/User";

export interface UseUsers {
  data: User[];
  set: (user: User) => void;
  get: () => void;
  update: (user: User) => void;
  delete: (userId: string) => void;
}

export function useUsers() {
  const users = useSelector((state: RootState) => state.users);

  function setUser(user: User) {}

  function getUsers() {}

  function updateUser(user: User) {}

  function deleteUsers(userId: string) {}

  return {
    data: users,
    set: setUser,
    get: getUsers,
    update: updateUser,
    delete: deleteUsers,
  };
}
