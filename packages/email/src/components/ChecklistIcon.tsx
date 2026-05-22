import { Img } from "@react-email/components";
import { iconSrc } from "../theme/colors";

export type ChecklistIconProps = {
  icon: string;
};

export function ChecklistIcon({ icon }: ChecklistIconProps) {
  return (
    <Img
      src={iconSrc(icon)}
      alt=""
      width={24}
      height={24}
      style={iconStyle}
    />
  );
}

const iconStyle = {
  display: "block",
  margin: 0,
};
