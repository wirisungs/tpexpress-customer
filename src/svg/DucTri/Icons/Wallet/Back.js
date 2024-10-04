import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#111"
      fillRule="evenodd"
      d="M11.47 6.198c.304.305.304.8 0 1.104L6.552 12.22h14.78a.781.781 0 0 1 0 1.562H6.553l4.916 4.917a.781.781 0 1 1-1.105 1.104l-6.25-6.25a.781.781 0 0 1 0-1.104l6.25-6.25a.781.781 0 0 1 1.105 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
