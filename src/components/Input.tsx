import { ChangeEvent, useEffect, useRef } from "react";
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
  setMenuItemRef: (node: HTMLInputElement, key: string | number) => void;
  index: number;
}

export const Input = (props: InputProps): JSX.Element => {
  const { index, setMenuItemRef } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setMenuItemRef(inputRef.current, index);
    }
  }, [index]);

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
        ref={inputRef}
      />
    </div>
  );
};
