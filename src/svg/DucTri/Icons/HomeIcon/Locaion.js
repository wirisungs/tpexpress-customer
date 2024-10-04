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
      d="M31.75 25.244v-8.5c0-1.566 0-2.348-.425-2.938-.343-.476-.893-.729-1.875-1.07-.2 2.41-.999 4.87-2.252 7.024-1.459 2.507-3.625 4.75-6.402 5.96a6.383 6.383 0 0 1-5.091 0c-2.777-1.21-4.944-3.453-6.403-5.96a17.299 17.299 0 0 1-2.004-5.274c-.574-.084-1.014-.04-1.394.171a2.25 2.25 0 0 0-.421.304c-.733.669-.733 1.913-.733 4.401v7.395c0 1.565 0 2.348.425 2.937.424.59 1.167.837 2.652 1.332l.575.192c2.366.788 3.549 1.183 4.758 1.185.365 0 .729-.025 1.09-.078 1.197-.173 2.321-.735 4.57-1.86 1.725-.862 2.587-1.293 3.503-1.493.32-.07.646-.12.974-.147.934-.078 1.877.08 3.761.393 1.91.319 2.865.478 3.563.078.236-.137.446-.314.62-.526.509-.622.509-1.59.509-3.526Z"
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M18.25 3c-4.97 0-9 3.828-9 8.55 0 4.686 2.873 10.153 7.354 12.108a4.133 4.133 0 0 0 3.292 0c4.482-1.955 7.354-7.422 7.354-12.108 0-4.722-4.03-8.55-9-8.55Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18.25}
        x2={18.25}
        y1={12.737}
        y2={32.403}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={18.25}
        x2={18.25}
        y1={3}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
