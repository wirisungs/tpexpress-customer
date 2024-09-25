import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#1c1c1c"
    width={16}
    height={16}
    className="bi bi-house-door-fill"
    {...props}
  >
    <Path d="M6.32 15.28v-3.925c0-.275.28-.555.56-.555h2.24c.28 0 .56.28.56.56v3.92c0 .31.25.56.56.56h4.48c.309 0 .56-.25.56-.56V7.44a.56.56 0 0 0-.164-.396L13.6 5.53V1.84a.56.56 0 0 0-.56-.56h-1.12a.56.56 0 0 0-.56.56v1.448L8.397.324a.56.56 0 0 0-.793 0l-6.72 6.72a.56.56 0 0 0-.163.397v7.839c0 .31.25.56.56.56h4.48c.308 0 .56-.25.56-.56" />
  </Svg>
);
export default SvgComponent;
