import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#111"
      d="M9.2 21.585a4.822 4.822 0 0 0 3.8 1.832 4.822 4.822 0 0 0 3.8-1.832 28.287 28.287 0 0 1-7.6 0ZM20.03 9.875v.734c0 .88.252 1.74.722 2.473l1.154 1.794c1.054 1.64.25 3.868-1.583 4.386a26.868 26.868 0 0 1-14.646 0c-1.832-.518-2.637-2.746-1.583-4.386l1.154-1.794c.47-.733.722-1.593.722-2.473v-.734c0-4.027 3.147-7.292 7.03-7.292 3.883 0 7.03 3.265 7.03 7.292Z"
    />
  </Svg>
)
export default SvgComponent
