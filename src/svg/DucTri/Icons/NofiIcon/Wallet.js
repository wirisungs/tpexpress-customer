import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
    viewBox="0 0 32 32"
  >
    <Path
      stroke="#2FA087"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.5 10.667h5.333"
    />
    <Path
      stroke="#2FA087"
      strokeLinecap="round"
      strokeWidth={2}
      d="M29.833 14c0-.103 0-.71-.003-.754-.047-.668-.62-1.2-1.339-1.243C28.444 12 28.39 12 28.278 12h-3.47c-2.38 0-4.308 1.79-4.308 4s1.929 4 4.308 4h3.47c.11 0 .166 0 .213-.003.72-.044 1.292-.575 1.34-1.243.002-.044.002-.65.002-.754"
    />
    <Path
      fill="#2FA087"
      d="M24.5 17.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Z"
    />
    <Path
      stroke="#2FA087"
      strokeLinecap="round"
      strokeWidth={2}
      d="M17.833 5.333c5.029 0 7.543 0 9.105 1.562C28.016 7.973 28.35 9.504 28.453 12m-14.62 14.667h4c5.029 0 7.543 0 9.105-1.563 1.078-1.077 1.412-2.608 1.515-5.104M12.5 5.334c-4.152.013-6.354.144-7.771 1.561C3.167 8.457 3.167 10.972 3.167 16c0 5.028 0 7.543 1.562 9.105.87.87 2.038 1.256 3.771 1.426"
    />
  </Svg>
)
export default SvgComponent
