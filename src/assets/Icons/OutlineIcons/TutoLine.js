import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <G
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#a)"
    >
      <Path d="M21.775 23.643H5.489a2.571 2.571 0 1 1 0-5.143H20.06a1.714 1.714 0 0 0 1.715-1.714V3.07a1.715 1.715 0 0 0-1.715-1.714H5.49A2.571 2.571 0 0 0 2.917 3.86v17.143M20.06 18.5v5.143" />
      <Path d="M14.148 9.075h3.969L13.9 15.028h4.465M6.366 10.76l1.828-5.482a.688.688 0 0 1 1.306 0l1.827 5.483m-4.3-1.984h3.639" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.346.5h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
