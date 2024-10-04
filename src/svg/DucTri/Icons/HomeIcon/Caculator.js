import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
    viewBox="0 0 36 36"
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M18.75 33c-6.364 0-9.546 0-11.523-2.197C5.25 28.607 5.25 25.071 5.25 18c0-7.071 0-10.607 1.977-12.803C9.204 3 12.386 3 18.75 3s9.546 0 11.523 2.197C32.25 7.393 32.25 10.929 32.25 18c0 7.071 0 10.607-1.977 12.803C28.296 33 25.113 33 18.75 33Zm4.5-24h-9c-.697 0-1.046 0-1.332.077a2.25 2.25 0 0 0-1.591 1.59c-.077.287-.077.636-.077 1.333s0 1.046.077 1.332a2.25 2.25 0 0 0 1.59 1.591c.287.077.636.077 1.333.077h9c.698 0 1.046 0 1.332-.077a2.25 2.25 0 0 0 1.591-1.59c.077-.287.077-.636.077-1.333s0-1.046-.077-1.332a2.25 2.25 0 0 0-1.59-1.591C24.295 9 23.947 9 23.25 9Zm-9 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-4.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-7.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18.75}
        x2={18.75}
        y1={3}
        y2={33}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
