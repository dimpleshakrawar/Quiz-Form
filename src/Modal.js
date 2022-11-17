import {
  Button,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function FormDialog({ open, setOpen, score }) {
  return (
    <div>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Final Score</DialogTitle>
        <DialogContent>
          {score > 3 ? (
            <Grid>
              <DialogContentText color={"black"} fontWeight={"bold"}>
                Whooray!!! Well done
              </DialogContentText>
              <DialogContentText sx={{ mt: 1 }} color={"black"}>
                Your score is {score} :)
              </DialogContentText>
            </Grid>
          ) : (
            <Grid>
              <DialogContentText color={"black"} fontWeight={"bold"}>
                Try again
              </DialogContentText>
              <DialogContentText sx={{ mt: 1 }} color={"black"}>
                Your score is {score} :(
              </DialogContentText>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color={"success"}
            variant="contained"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
