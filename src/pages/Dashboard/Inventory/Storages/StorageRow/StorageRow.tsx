import { useSelector } from "react-redux";
import { RootState } from "../../../../../interfaces/ReduxState";
import { Storage } from "../../../../../interfaces/Storage";

import style from "./StorageRow.module.css";
import editSvg from "../../../../../assets/icons/edit.svg";
import deleteSvg from "../../../../../assets/icons/remove.svg";

interface Props {
  storage: Storage;
  handleEdit: (storage: Storage) => void;
  handleDelete: (storageId: string) => void;
}

export default function StorageRow({
  storage,
  handleEdit,
  handleDelete,
}: Props) {
  const user = useSelector((state: RootState) => state.users);

  return (
    <tr className={style.row}>
      <span>{storage.name}</span>
      <span>{user.find((user) => user.id === storage.UserId[0])?.name}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(storage)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(storage.id!)}
      >
        <img src={deleteSvg} alt="delete" />
      </button>
    </tr>
  );
}
