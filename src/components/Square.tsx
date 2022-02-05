import { ChangeEvent, useRef, useEffect } from "react";

export interface InputProps {
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  setInputRef: (node: HTMLInputElement, key: number) => void;
  setFocused: () => void;
  index: number;
  state?: "green" | "yellow" | "grey" | "default";
  show?: boolean;
  tabIndex?: number;
  // correctValue: string;
}

export const InputSquare = (props: InputProps): JSX.Element => {
  const { index, setInputRef, state = "default" } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputRef(inputRef.current, index);
    }
  }, [index]);

  return (
    <input
      type={"text"}
      className={`${props.className} input ${state} square-${index} square`}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      onBlur={props.onBlur}
      ref={inputRef}
      max={1}
      onFocus={props.setFocused}
      tabIndex={props.tabIndex}
    />
  );
};
