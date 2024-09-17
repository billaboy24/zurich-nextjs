import React from "react";
import { Modal as MuiModal, Box } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
}

const modalStyles = {
  container: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90%",
      sm: 400,
    },
    bgcolor: "background.paper",
    border: "2px solid #D9D9D9",
    borderRadius: "20px",
    boxShadow: 24,
    p: 3,
    fontSize: "14px",
  },
  title: {
    fontFamily: "GothamBold",
    fontSize: "16px",
  },
};

const Modal: React.FC<ModalProps> = ({ open, onClose, title, content }) => {
  return (
    <MuiModal open={open} onClose={onClose} disablePortal>
      <Box sx={modalStyles.container}>
        <Box sx={modalStyles.title}>{title}</Box>
        <hr />
        <Box>{content}</Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
