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
      fill={props.fill || "#000"}
      d="M12 14.793a.735.735 0 1 0 0 1.47.735.735 0 0 0 0-1.47Zm0-1.617a.588.588 0 0 0 .588-.588V7.884a.588.588 0 0 0-1.176 0v4.705c0 .324.263.587.588.587ZM12 .24C5.505.24.24 5.505.24 12S5.505 23.76 12 23.76c6.492-.008 11.752-5.268 11.76-11.76C23.76 5.505 18.495.24 12 .24Zm0 22.344C6.155 22.584 1.416 17.845 1.416 12S6.155 1.416 12 1.416C17.843 1.422 22.578 6.157 22.584 12c0 5.845-4.739 10.584-10.584 10.584Z"
    />
  </Svg>
);
export default SvgComponent;
