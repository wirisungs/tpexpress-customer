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
      fillRule="evenodd"
      d="M8.867 4.615a.781.781 0 0 1 1.101.085l6.25 7.291c.251.293.251.725 0 1.017L9.968 20.3a.781.781 0 0 1-1.186-1.017l5.814-6.783-5.814-6.784a.781.781 0 0 1 .085-1.101Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
