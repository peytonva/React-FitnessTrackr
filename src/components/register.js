import {
    Button,
    TextField,
    Typography,
    Container,
    makeStyles,
  } from "@material-ui/core";
  import { useState } from "react";
  import { registerUser } from "../api";
  import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
  
const Register = () => {
const [username, setUsername] = useState();
const [password, setPassword] = useState();
  
const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser(username, password);
};
  
const useStyles = makeStyles((theme) => ({
    root: {
    "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
    },
},
    btn: {
    fontSize: 20,
    backgroundColor: "#E2725A",
    "&:hover": {
        backgroundColor: "#94ACBF",
    },
    },
    title: {
    marginTop: 20,
  
    color: "#79AEB2",
    fontSize: 40,
},
    subTitle: {
    color: "#79AEB2",
    fontSize: 30,
},
    textField: {
    color: "#F9DDD2",
    backgroundColor: "#F9DDD2",
},
    form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
},
}));
const classes = useStyles();
  
return (
    <div className={classes.root}>
    <Container>
        <Typography
        className={classes.title}
        variant='h6'
        color='secondary'
        component='h2'
        align='center'
        gutterBottom>
        Welcome to Fitness Trackr
        </Typography>
        <Typography
        className={classes.subTitle}
        variant='h1'
        color='secondary'
        component='h2'
        align='center'
        gutterBottom>
         Please create an account
        </Typography>
        <form
        noValidate
        autoComplete='off'
        onSubmit={onFormSubmit}
        className={classes.form}>
    <TextField
            className={classes.textField}
            required
            id='outlined-required'
            label='Required'
            variant='outlined'
            color='#F9DDD2'
            defaultValue='Enter your username'
            onInput={(event) => {
        setUsername(event.target.value);
 }}
/>
     <TextField
            className={classes.textField}
            id='outlined-required'
            type='password'
            label='Required'
            variant='outlined'
            defaultValue='Password'
            onInput={(event) => {
            setPassword(event.target.value);
            }}
/>
      <Button
            className={classes.btn}
            type='submit'
            color='secondary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}>
            Register
        </Button>
    </form>
    </Container>
    </div>
);
};
  
export default Register;
