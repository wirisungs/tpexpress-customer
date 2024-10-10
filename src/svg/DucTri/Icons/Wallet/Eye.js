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
      fill="#FCFCFC"
      d="M13 5.664c3.593 0 7.97 2.36 9.502 5.763.143.32.264.693.264 1.073 0 .379-.12.753-.264 1.073-1.532 3.403-5.91 5.763-9.502 5.763-3.593 0-7.97-2.36-9.502-5.763-.143-.321-.264-.693-.264-1.073 0-.379.12-.753.264-1.073C5.03 8.024 9.408 5.664 13 5.664Zm0 2.93a3.906 3.906 0 1 0 0 7.812 3.906 3.906 0 0 0 0-7.812Zm0 1.953a1.954 1.954 0 1 1 0 3.907 1.954 1.954 0 0 1 0-3.907Z"
    />
  </Svg>
)
export default SvgComponent
