import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Path
      fill="#111"
      fillRule="evenodd"
      d="M7.384 14.187a1.25 1.25 0 0 1 1.763-.136L20 23.354l10.853-9.303a1.25 1.25 0 0 1 1.627 1.898l-11.666 10a1.25 1.25 0 0 1-1.627 0l-11.667-10a1.25 1.25 0 0 1-.136-1.762Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
