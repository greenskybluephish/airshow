// import { FC, ReactNode, useState } from "react";
// import {
//   colors,
//   fontSizes,
//   Heading,
//   Text,
//   typestyles,
// } from "./components/Text";
// import type { Colors, FontSizes } from "./components/Text";
// import "./App.css";
// import { Input } from "./components/Input";

// export default App;

// const renderAll = () => {
//   const colorArray = typedKeys(colors);

//   return colorArray.map((color, i) => <div key={i}>{renderSizes(color)}</div>);
// };

// const renderSizes = (color: Colors) => {
//   const fontSizesArray = typedKeys(fontSizes);
//   return fontSizesArray.map((size, i) => (
//     <Text
//       key={i + color + size}
//       color={color}
//       size={size}
//       text={"This is a sentence."}
//     />
//   ));
// };

// const renderHeadings = () => {
//   const typestylesArr = typedKeys(typestyles);
//   return typestylesArr.map((typestyle, i) => (
//     <Heading styles={typestyle} key={i}>
//       All the headings are here for you.{" "}
//     </Heading>
//   ));
// };

// export const typedKeys = <T extends Record<string, any>>(
//   obj: T
// ): Array<keyof T> => {
//   return Object.keys(obj) as Array<keyof T>;
// };

// interface SquareProps {
//   letter: string;
//   index: number;
// }

// const Square = (props: SquareProps) => {
//   return <div className="letterGrid"><Input /></div>;
// };

// interface RowProps {
//   word: string;
//   visible: boolean;
//   active: boolean;
//   // children: ReactNode;
// }

// const Row = (props: RowProps) => {
//   return (
//     <div className="letterGrid">
//       {Array.from(props.word).map((letter, i) => (
//         <Square />
//       ))}
//     </div>
//   );
// };

export {};
