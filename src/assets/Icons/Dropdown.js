import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#1c1c1c"
    viewBox="-0.5 -0.5 24 24"
    {...props}
  >
    <Path
      fill={props.fill || "#1c1c1c"}
      d="M11.5 14.47a.703.703 0 0 1-.263-.047.73.73 0 0 1-.24-.168L6.253 9.511a.663.663 0 0 1-.203-.515.748.748 0 0 1 .227-.515.703.703 0 0 1 .515-.215c.2 0 .372.072.515.215l4.193 4.217 4.217-4.217a.649.649 0 0 1 .503-.203c.192.008.36.083.503.227a.703.703 0 0 1 .216.515c0 .2-.072.372-.216.515l-4.72 4.72a.73.73 0 0 1-.24.168.703.703 0 0 1-.263.048Z"
    />
  </Svg>
);
export default SvgComponent;
