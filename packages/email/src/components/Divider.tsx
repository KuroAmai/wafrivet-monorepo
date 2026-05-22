import { Hr } from "@react-email/components";
import { emailColors } from "../theme/colors";

export function Divider() {
  return <Hr style={divider} />;
}

const divider = {
  borderColor: emailColors.sage100,
  borderWidth: "1px",
  margin: "24px 0",
};
