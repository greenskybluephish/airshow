import { ChangeEvent } from "react";
import "./Input.scss";

export interface InputProps {
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Input = (props: InputProps): JSX.Element => {
  return (
    <div style={props.style} className={props.className}>
      <input
        type={"text"}
        className={props.className}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
