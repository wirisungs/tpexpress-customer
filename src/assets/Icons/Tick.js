import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    viewBox="-0.5 -0.5 10 10"
    {...props}
  >
    <Path
      fill={props.fill || "#1c1c1c"}
      d="m3.544 5.887 3.403-3.403a.282.282 0 0 1 .403 0 .276.276 0 0 1 .084.202.275.275 0 0 1-.084.201l-3.61 3.61a.27.27 0 0 1-.393 0L1.64 4.79a.26.26 0 0 1-.08-.202.291.291 0 0 1 .09-.202.276.276 0 0 1 .201-.084c.078 0 .145.028.201.084l1.49 1.5Z"
    />
  </Svg>
);
export default SvgComponent;
