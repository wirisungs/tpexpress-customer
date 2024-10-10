import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={332}
    height={332}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={9}
      d="M28.739 89.744V59.24c0-16.846 13.656-30.503 30.502-30.502h30.503M242.256 28.739h30.503c16.846 0 30.502 13.656 30.502 30.502v30.503M303.261 242.256v30.503c0 16.846-13.656 30.504-30.502 30.502h-30.503M89.744 303.261H59.24c-16.846.002-30.502-13.656-30.502-30.502v-30.503"
    />
  </Svg>
)
export default SvgComponent
