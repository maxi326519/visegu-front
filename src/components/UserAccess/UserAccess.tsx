import { useSelector } from "react-redux";
import { RootState } from "../../interfaces/ReduxState";
import { ReactNode } from "react";
import { UserRol } from "../../interfaces/User";

import AccessDenied from "../../pages/AccessDenied/AccessDenied";

interface Props {
  children: ReactNode;
}

const UserAccess: React.FC<Props> = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.login);

  return user.rol === UserRol.ADMIN ? (
    (children as React.ReactElement)
  ) : (
    <AccessDenied />
  );
};

export default UserAccess;
