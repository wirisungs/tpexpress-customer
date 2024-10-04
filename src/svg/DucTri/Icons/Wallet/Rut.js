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
      d="M16.846 5.227V18a1.102 1.102 0 1 1-2.205 0V5.227l-2.527 2.529a1.103 1.103 0 1 1-1.56-1.56l4.41-4.41a1.102 1.102 0 0 1 1.56 0l4.41 4.41a1.103 1.103 0 0 1-1.56 1.56l-2.528-2.53Zm8.82 12.17V13.59a2.205 2.205 0 0 0-2.205-2.204h-2.205a1.102 1.102 0 0 0 0 2.204h2.205v11.08c-2.078-2.123-5.674-1.2-6.474 1.661-.28 1-.144 2.07.376 2.97l.033.052 3.068 4.685a1.103 1.103 0 1 0 1.845-1.207l-3.05-4.656a1.654 1.654 0 0 1 2.879-1.63.68.68 0 0 0 .032.052l1.471 2.247a1.102 1.102 0 0 0 2.025-.603v-8.036a10.313 10.313 0 0 1 3.307 7.537v5.693a1.102 1.102 0 0 0 2.205 0v-5.699a12.525 12.525 0 0 0-5.512-10.34ZM10.23 11.386H8.026a2.205 2.205 0 0 0-2.204 2.204v14.332a1.102 1.102 0 0 0 2.204 0V13.59h2.205a1.103 1.103 0 0 0 0-2.204Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18.5}
        x2={18.5}
        y1={1.462}
        y2={34.539}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
