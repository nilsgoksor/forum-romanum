import { Alert, Snackbar, AlertColor } from "@mui/material";

const success: AlertColor = "success";
const error: AlertColor = "error";

export const MessageType = {
  SUCCESS: success,
  ERROR: error,
};

interface UserMessageI {
  message: string;
  type: AlertColor;
  handleClose(): void;
}

export const UserMessage = ({ message, type, handleClose }: UserMessageI) => {
  const open = message.length > 0;
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};
