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
      fill="#767676"
      fillRule="evenodd"
      d="M20.007 6.966a1.042 1.042 0 0 0-1.473-1.473L12.5 11.527 6.466 5.493a1.042 1.042 0 0 0-1.473 1.473L11.027 13l-6.034 6.034a1.042 1.042 0 1 0 1.473 1.473l6.034-6.034 6.035 6.034a1.042 1.042 0 0 0 1.472-1.473L13.973 13l6.034-6.034Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
