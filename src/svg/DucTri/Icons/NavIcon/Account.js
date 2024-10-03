import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 16 14"
    {...props} // Cho phép nhận thêm các props từ bên ngoài
  >
    <Path
      fill={props.fill || "#111"} // Sử dụng màu từ props hoặc mặc định là "#111"
      stroke={props.fill || "#111"} // Đặt màu stroke từ props hoặc mặc định là "#111"
      strokeWidth={33.333}
      d="M9.875 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
    <Path
      fill={props.fill || "#111"} // Sử dụng màu từ props hoặc mặc định là "#111"
      d="M15.875 13.625c0 1.864 0 3.375-6 3.375s-6-1.511-6-3.375 2.686-3.375 6-3.375 6 1.511 6 3.375Z"
    />
  </Svg>
);

export default SvgComponent;
