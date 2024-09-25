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
      d="M18.72 12.01V5.884a.588.588 0 0 0-.173-.416l-3.085-3.086a.588.588 0 0 0-.416-.172H3.628a.588.588 0 0 0-.588.588v18.424c0 .325.263.588.588.588h8.232M6.96 10.05h7.84M6.96 6.13h3.92m-3.92 7.84H9.9"
    />
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.8 2.21v3.332c0 .325.263.588.587.588h3.332M18.712 15.072l2.504.637c.261.066.445.303.437.572-.168 5.643-3.423 6.509-3.423 6.509s-3.255-.866-3.424-6.51a.576.576 0 0 1 .437-.572l2.504-.636c.317-.08.648-.08.965 0Z"
    />
  </Svg>
);
export default SvgComponent;
