import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect width={32} height={32} fill="#EB455F" rx={16} />
    <Path
      fill="#FCEDEE"
      d="m15.65 19.594 4.314-4.314a6.002 6.002 0 0 1-1.94-1.304 6 6 0 0 1-1.304-1.94l-4.314 4.314c-.337.337-.505.505-.65.69-.17.22-.317.457-.436.707-.102.213-.177.439-.328.89l-.794 2.382a.619.619 0 0 0 .783.783l2.382-.794c.452-.151.678-.226.89-.328.25-.119.488-.265.707-.436.185-.145.353-.313.69-.65ZM21.161 14.082a2.294 2.294 0 0 0-3.244-3.244l-.517.518.022.065c.19.546.547 1.263 1.22 1.936a5.106 5.106 0 0 0 2.002 1.243l.517-.518Z"
    />
  </Svg>
)
export default SvgComponent
