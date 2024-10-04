import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="-0.5 -0.5 16 16"
    {...props}
  >
    <Path
      fill="#fff"
      d="M14.688 2.49a.566.566 0 0 0-.8-.008l-8.832 8.832L1.11 7.37a.565.565 0 0 0-.8.8l4.345 4.344a.564.564 0 0 0 .8 0l9.232-9.232a.565.565 0 0 0 0-.792Z"
    />
  </Svg>
);
export default SvgComponent;
