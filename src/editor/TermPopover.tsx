import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";

export interface TermPopoverProps {
  parent: any;
}
export default function TermPopover(props: TermPopoverProps) {
  const [editor] = useLexicalComposerContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    editor.update(() => {
      props.parent.setValue(event.target.value);
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <span>
      <Chip label="Clickable" onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        <TextField label="Value" variant="standard" onBlur={onBlur} />
      </Popover>
    </span>
  );
}
