import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill={props.fill || "#1c1c1c"}
      fillRule="evenodd"
      d="M0 12.571c0 .947.766 1.715 1.712 1.715h12.576c.946 0 1.712-.768 1.712-1.715v-2.324a.571.571 0 0 0-.422-.552 1.757 1.757 0 0 1 0-3.39.571.571 0 0 0 .422-.552V3.43c0-.947-.766-1.715-1.712-1.715H1.712C.766 1.714 0 2.482 0 3.43v2.32a.571.571 0 0 0 .426.552 1.757 1.757 0 0 1 0 3.398.571.571 0 0 0-.426.552v2.32Zm5.67-1.209 5.715-5.714a.714.714 0 0 0-1.009-1.01l-5.714 5.714a.714.714 0 1 0 1.009 1.01ZM4.596 5.714a1.143 1.143 0 1 1 2.286 0 1.143 1.143 0 0 1-2.286 0Zm4.572 4.572a1.143 1.143 0 1 1 2.286 0 1.143 1.143 0 0 1-2.286 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
