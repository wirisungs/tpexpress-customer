import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M34.537 2.84v6.891a1.378 1.378 0 1 1-2.756 0V4.22H26.27a1.378 1.378 0 0 1 0-2.757h6.89c.761 0 1.378.617 1.378 1.379ZM9.731 31.782H4.22V26.27a1.378 1.378 0 1 0-2.757 0v6.89c0 .761.617 1.378 1.379 1.378h6.89a1.378 1.378 0 0 0 0-2.756Zm23.428-6.89c-.76 0-1.378.617-1.378 1.378v5.512H26.27a1.378 1.378 0 1 0 0 2.756h6.89c.761 0 1.378-.617 1.378-1.378v-6.89c0-.761-.617-1.378-1.378-1.378ZM2.841 11.108c.76 0 1.378-.617 1.378-1.378V4.22H9.73a1.378 1.378 0 0 0 0-2.757h-6.89c-.762 0-1.379.617-1.379 1.379v6.89c0 .761.617 1.378 1.379 1.378Zm6.89-2.756H26.27c.76 0 1.378.617 1.378 1.378V26.27c0 .76-.617 1.378-1.378 1.378H9.73a1.378 1.378 0 0 1-1.378-1.378V9.73c0-.761.617-1.378 1.378-1.378Zm1.378 16.538H24.89V11.108H11.11V24.89Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18}
        x2={18}
        y1={1.462}
        y2={34.537}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
