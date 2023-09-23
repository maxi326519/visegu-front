interface CheckboxProps {
  name: string;
  value: any;
  label: string;
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @prop { string } name - Input name and id
 * @prop { any } value - Input value
 * @prop { string } label - Input label
 * @prop { () => void } handleCheck - Function for onChange input
 */
export default function Checkbox({
  name,
  value = false,
  label,
  handleCheck,
}: CheckboxProps) {
  return (
    <div className="form-check">
      <input
        id={name}
        name={name}
        className="form-check-input"
        type="checkbox"
        checked={value}
        onChange={handleCheck}
      />
      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
    </div>
  );
}
