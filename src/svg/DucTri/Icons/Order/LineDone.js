import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={4}
    fill="none"
    {...props}
  >
    <Path stroke="#2FA087" strokeLinecap="round" strokeWidth={8} d="M2 2h35" />
  </Svg>
)
export default SvgComponent
