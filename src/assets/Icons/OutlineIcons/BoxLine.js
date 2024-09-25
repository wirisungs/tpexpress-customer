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
      strokeWidth={1}
      d="m15.914 2.572 2.188 1.148c2.354 1.236 3.53 1.853 4.184 2.963.653 1.11.653 2.491.653 5.253v.128c0 2.762 0 4.143-.653 5.253s-1.83 1.727-4.184 2.963l-2.188 1.148c-1.92 1.008-2.881 1.511-3.914 1.511-1.033 0-1.993-.503-3.914-1.511L5.898 20.28c-2.354-1.236-3.53-1.853-4.184-2.963-.653-1.11-.653-2.491-.653-5.253v-.128c0-2.762 0-4.143.653-5.253.654-1.11 1.83-1.727 4.184-2.963l2.188-1.148C10.006 1.564 10.967 1.06 12 1.06c1.033 0 1.993.504 3.914 1.512Z"
    />
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeWidth={1}
      d="M21.846 7.077 17.47 9.265M12 12 2.154 7.077M12 12v10.393M12 12l4.923-2.461.547-.274m0 0v3.829m0-3.829L7.077 3.795"
    />
  </Svg>
);
export default SvgComponent;
