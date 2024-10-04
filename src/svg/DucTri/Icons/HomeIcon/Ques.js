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
      d="M25.75 27.645h-6l-6.675 4.44c-.99.66-2.325-.045-2.325-1.245v-3.195c-4.5 0-7.5-3-7.5-7.5v-9c0-4.5 3-7.5 7.5-7.5h15c4.5 0 7.5 3 7.5 7.5v9c0 4.5-3 7.5-7.5 7.5Z"
    />
    <Path
      stroke="#FCFCFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.25 17.04v-.315c0-1.02.63-1.56 1.26-1.995.615-.42 1.23-.96 1.23-1.95 0-1.38-1.11-2.49-2.49-2.49-1.38 0-2.49 1.11-2.49 2.49M18.243 20.625h.014"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18.25}
        x2={18.25}
        y1={3.645}
        y2={32.338}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
