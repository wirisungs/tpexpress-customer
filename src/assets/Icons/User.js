import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F91313"
      d="M8.596 6.375a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0ZM19.846 17.156c0 2.33 0 4.219-7.5 4.219s-7.5-1.889-7.5-4.219 3.358-4.218 7.5-4.218c4.142 0 7.5 1.888 7.5 4.218Z"
    />
  </Svg>
);
export default SvgComponent;
