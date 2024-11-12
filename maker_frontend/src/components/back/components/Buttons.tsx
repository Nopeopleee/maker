// MUI
import { Stack, Button } from "@mui/material";

// Iconify
import { Icon } from "@iconify/react";

interface ButtonProps {
  text: string;
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  icon: string;
  outlined?: boolean;
  onClick: () => void;
}

const Buttons = ({ buttons }: { buttons: ButtonProps[] }) => {
  return (
    <Stack direction="row" spacing={2}>
      {buttons.map((button, index) => {
        return (
          <Button
            key={index}
            variant={button.outlined ? "outlined" : "contained"}
            color={button.color}
            startIcon={<Icon icon={button.icon} />}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Buttons;
