import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={4}
    fill="none"
    {...props}
  >
    <Path stroke="#C4C4C4" strokeLinecap="round" strokeWidth={8} d="M2 2h40" />
  </Svg>
)
export default SvgComponent
