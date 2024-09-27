import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
    viewBox="0 0 42 42"
  >
    <Path
      fill="#F44336"
      d="M18 14.923v6.154Zm-2.665 1.539 5.329 3.076Zm5.329 0-5.33 3.076Z"
    />
    <Path
      stroke="#EB455F"
      strokeLinecap="round"
      d="M18 14.923v6.154m-2.665-4.615 5.329 3.076m0-3.076-5.33 3.076"
    />
    <Path
      fill="#F44336"
      d="M9.896 14.923v6.154Zm-2.665 1.539 5.33 3.076Zm5.329 0L7.23 19.538Z"
    />
    <Path
      stroke="#EB455F"
      strokeLinecap="round"
      d="M9.896 14.923v6.154m-2.665-4.615 5.33 3.076m-.001-3.076L7.23 19.538"
    />
    <Path
      fill="#F44336"
      d="M26.104 14.923v6.154Zm-2.665 1.539 5.329 3.076Zm5.329 0-5.33 3.076Z"
    />
    <Path
      stroke="#EB455F"
      strokeLinecap="round"
      d="M26.104 14.923v6.154m-2.665-4.615 5.329 3.076m0-3.076-5.33 3.076"
    />
    <Path
      stroke="#EB455F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M33.384 18c0 5.802 0 8.703-1.803 10.505-1.802 1.802-4.703 1.802-10.504 1.802h-6.154c-5.801 0-8.702 0-10.505-1.802C2.616 26.703 2.616 23.802 2.616 18c0-5.802 0-8.702 1.802-10.505 1.803-1.802 4.704-1.802 10.505-1.802h6.154c5.801 0 8.702 0 10.504 1.802 1.005 1.005 1.45 2.351 1.646 4.352"
    />
  </Svg>
);
export default SvgComponent;
