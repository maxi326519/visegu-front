import { useState } from "react";
import { User } from "../../../../interfaces/User";

import style from "./UserRow.module.css";
import editSvg from "../../../../assets/icons/edit.svg";
import removeSvg from "../../../../assets/icons/remove.svg";

interface Props {
  user: User;
  handleEdit: (user: User) => void;
  handleDelete: (user: string) => void;
}

export default function UserRow({
  user,
  handleEdit,
  handleDelete,
}: Props) {
  const [error, setError] = useState(false);

  return (
    <tr className={`${style.row} ${error ? style.error : ""}`}>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.rol}</span>
      <span>{user.status ? "Active" : "Inactive"}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(user)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(user.id!)}
      >
        <img src={removeSvg} alt="remove" />
      </button>
    </tr>
  );
}
