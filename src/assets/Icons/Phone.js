import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="-0.5 -0.5 16 16"
    {...props}
  >
    <Path d="M12.188 13.594h-.08C2.897 13.064 1.589 5.292 1.406 2.92A1.406 1.406 0 0 1 2.7 1.406h2.583a.938.938 0 0 1 .872.59l.712 1.754a.938.938 0 0 1-.206 1.013L5.663 5.77a4.392 4.392 0 0 0 3.553 3.563l1.017-1.008a.938.938 0 0 1 1.017-.192l1.767.708a.938.938 0 0 1 .577.871v2.476a1.406 1.406 0 0 1-1.406 1.406ZM2.812 2.344a.469.469 0 0 0-.468.469v.037c.215 2.775 1.598 9.338 9.815 9.806a.469.469 0 0 0 .497-.44V9.713l-1.767-.708-1.345 1.336-.225-.029c-4.078-.51-4.632-4.589-4.632-4.63l-.028-.226 1.332-1.345-.704-1.767Z" />
    <Path fill="none" d="M0 0h15v15H0Z" />
  </Svg>
);
export default SvgComponent;
