import * as React from "react";
import { Button as HeroUIButton } from "@heroui/react";

type Props = React.ComponentProps<typeof HeroUIButton>;

export function Button(props: Props) {
  return <HeroUIButton {...props} />;
}

