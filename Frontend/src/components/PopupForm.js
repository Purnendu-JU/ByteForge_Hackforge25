import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopupForm({ open, closeForm }) {
  const handleSubmit = () => {
    console.log("The Community Platform Popup Box is Submitted...");
  };

  return (
    <>
      <Dialog open={open} onClose={closeForm}>
        <DialogTitle sx={{fontWeight: "bolder", mb: -1}}>Share Your Experience</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Post your reviews, thoughts, and procedures that will help others to
            make the right decision at the right time
          </DialogContentText>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            placeholder="Enter your message..."
            sx={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm}>Cancel</Button>
          <Button type="submit" onClick={() => {handleSubmit(); closeForm()}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
