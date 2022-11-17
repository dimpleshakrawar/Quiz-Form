import {
  FormControlLabel,
  FormLabel,
  FormControl,
  Box,
  Paper,
  Grid,
  Button,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import { useState } from "react";
import data from "./data.json";
import Modal from "./Modal";

function QuizForm() {
  const [userInput, setUserInput] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [marks, setMarks] = useState(0);
  const [randomQuestion] = useState(randomGen(5, data));

  function randomGen(number, data) {
    if (number > data.length) return;
    let randomIndex = [];
    while (randomIndex.length < number) {
      const randomNo = Math.floor(Math.random() * data.length);
      if (randomIndex.indexOf(randomNo) === -1) randomIndex.push(randomNo);
    }
    return randomIndex.map((val) => data[val]);
  }

  const changeHandler = (questId, ansId) => {
    // const cloneData = JSON.parse(JSON.stringify(userInput));
    // cloneData.push({ questId, ansId });
    // setUserInput(cloneData);
    console.log("changes");
    setUserInput((preVal) => [...preVal, { questId, ansId }]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let score = 0;
    for (let val of userInput) {
      const quesFromBank = data.find((que) => que.id === val.questId);
      if (quesFromBank.ans === val.ansId) score = score + 1;
    }
    setMarks(score);
    console.log(score);
    setOpenModal(true);
  };

  return (
    <Paper elevation={3} style={{ margin: "20px 50px" }}>
      <Box sx={{ backgroundColor: "rgb(67,157,70)" }}>
        <Grid textAlign={"center"} sx={{ p: 3 }}>
          <Typography
            variant="h4"
            style={{
              backgroundColor: "rgb(67,157,70)",
              color: "white",
              margin: "0",
            }}
            gutterBottom
          >
            General Knowledge Quiz
          </Typography>
          <Typography
            variant="h7"
            style={{
              backgroundColor: "rgb(67,157,70)",
              color: "white",
              margin: "0",
            }}
            gutterBottom
          >
            Please complete each quiz below to test your General Knowledge and
            submit to get your scores.
          </Typography>
        </Grid>
      </Box>
      <Box style={{ padding: "20px 50px" }}>
        {randomQuestion?.map((ques, index) => (
          <Grid key={ques.id}>
            <FormControl sx={{ m: 1 }}>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ color: "black" }}
              >
                {`${index + 1}. ${ques.question}`}
              </FormLabel>
              <RadioGroup column sx={{ p: 2 }} name="radio-buttons-group">
                {ques.options?.map((opt) => (
                  <Grid item key={opt.id}>
                    <FormControlLabel
                      onChange={() => changeHandler(ques.id, opt.id)}
                      value={opt.value}
                      control={<Radio size="small" color="success" />}
                      label={opt.value}
                    />
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        ))}
        <Grid style={{ textAlign: "center" }}>
          <Button
            color="success"
            style={{ margin: "8px" }}
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Grid>
        <Modal open={openModal} setOpen={setOpenModal} score={marks} />
      </Box>
    </Paper>
  );
}

export default QuizForm;
