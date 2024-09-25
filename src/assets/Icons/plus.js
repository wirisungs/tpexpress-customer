import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={"#fff"}
    width={16}
    height={16}
    className="bi bi-plus"
    {...props}
  >
    <Path d="M8 .16a.98.98 0 0 1 .98.98v5.88h5.88a.98.98 0 0 1 0 1.96H8.98v5.88a.98.98 0 0 1-1.96 0V8.98H1.14a.98.98 0 0 1 0-1.96h5.88V1.14A.98.98 0 0 1 8 .16" />
  </Svg>
);
export default SvgComponent;
