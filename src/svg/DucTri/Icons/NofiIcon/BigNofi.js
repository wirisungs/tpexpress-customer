import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={150}
    height={150}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EB455F"
      strokeLinecap="round"
      strokeWidth={6}
      d="M56.922 16.713A40.746 40.746 0 0 1 75 12.5c23.296 0 42.182 19.601 42.182 43.781v4.404c0 5.285 1.507 10.451 4.332 14.849l6.921 10.775c6.322 9.843 1.496 23.222-9.5 26.334a161.087 161.087 0 0 1-87.87 0c-10.996-3.112-15.822-16.491-9.5-26.334l6.921-10.775c2.825-4.398 4.332-9.564 4.332-14.85v-4.403c0-6.715 1.456-13.077 4.06-18.764M46.875 118.75C50.969 129.674 62.015 137.5 75 137.5c1.528 0 3.03-.108 4.495-.318m23.63-18.432c-1.669 4.454-4.494 8.393-8.134 11.496"
    />
  </Svg>
)
export default SvgComponent
