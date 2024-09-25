import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.14}
      d="M9.195 10.1a1.56 1.56 0 1 0 0-3.118 1.56 1.56 0 0 0 0 3.119ZM15.563 16.502a1.56 1.56 0 1 0 0-3.119 1.56 1.56 0 0 0 0 3.119Z"
    />
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.14}
      d="M22.297 7.274v1.852a3.185 3.185 0 0 0 0 5.849v1.852c0 1.758-1.263 2.935-3.184 3.184-5.284.685-8.24.69-13.533 0-1.868-.243-3.184-1.426-3.184-3.184v-1.852a3.185 3.185 0 0 0 0-5.849V7.274c0-1.759 1.329-2.87 3.184-3.184 5.23-.887 8.227-.754 13.533 0 1.755.249 3.184 1.425 3.184 3.184Z"
    />
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.14}
      d="M8.694 15.377c3.225-2.653 4.836-4.246 7.304-7.304"
    />
  </Svg>
);
export default SvgComponent;
