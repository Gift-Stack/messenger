import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid,
    Box,
    Paper,
    Button,
    FormControl,
    TextField,
    InputAdornment,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { login } from './store/utils/thunkCreators';

import styles from './styles/signup/signup.module.css';
import Left from './components/Authentication/Left';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: 'auto',
    },
    right: {
        maxHeight: '100vh',
        width: '100%',
        [theme.breakpoints.down(600)]: {
            minHeight: '100vh',
        },
    },
    account: {
        margin: '24px 30px',
        [theme.breakpoints.down('sm')]: {
            margin: '10px 15px',
        },
    },
    account_text: {
        marginRight: '25px',
        color: '#aaa',

        [theme.breakpoints.down(700)]: {
            fontSize: 12,
        },
        [theme.breakpoints.down(630)]: {
            fontSize: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '10px',
        },
        [theme.breakpoints.down(345)]: {
            fontSize: 'smaller',
        },
    },
    button: {
        width: '170px',
        padding: '15px 30px',
        color: '#3a8dff',
        background: '#fff',
        boxShadow: '0px 2px 6px rgba(74, 106, 149, 0.2)',
        filter: 'drop-shadow(0px 2px 6px rgba(74, 106, 149, 0.2))',

        [theme.breakpoints.down('sm')]: {
            fontSize: 'small',
            width: 'auto',
            padding: '10px 15px',
        },
    },
    input: {
        width: 'calc((100vw / 2) - 80px)',
        marginTop: '40px',
        [theme.breakpoints.down(600)]: {
            width: '80vw',
        },
    },
    input_firstchild: {
        marginTop: '2px',
    },
    authBtn: {
        padding: '15px 30px',
        color: '#fff',
        background: '#3a8dff',
        width: '170px',
        marginTop: '50px',
    },
}));

const Login = props => {
    const classes = useStyles();
    const [focus, setFocus] = React.useState(false);
    const history = useHistory();
    const { user, login } = props;

    const handleLogin = async event => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        await login({ username, password });
    };

    if (user.id) {
        return <Redirect to='/home' />;
    }

    const toggleFocus = () => {
        setFocus(prev => !prev);
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={0}>
                    <Left />
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        container
                        alignItems='center'
                        justifyContent='center'
                    >
                        <div className={classes.right}>
                            <Box
                                position='absolute'
                                className={classes.account}
                                top={0}
                                right={0}
                            >
                                <Grid
                                    item
                                    container
                                    justifyContent='flex-end'
                                    alignItems='center'
                                    mr={2}
                                >
                                    <p
                                        className={classes.account_text}
                                        style={{
                                            color: '#aaa',
                                        }}
                                    >
                                        Don't have an account?
                                    </p>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        className={classes.button}
                                        onClick={() =>
                                            history.push('/register')
                                        }
                                    >
                                        Create account
                                    </Button>
                                </Grid>
                            </Box>
                            <Grid item container justifyContent='center'>
                                <form
                                    noValidate
                                    autoComplete='off'
                                    onSubmit={handleLogin}
                                >
                                    <Grid item container direction='column'>
                                        <h2 align='left'>Welcome back!</h2>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                label='Username'
                                                aria-label='username'
                                                type='text'
                                                name='username'
                                                className={
                                                    classes.input +
                                                    ' ' +
                                                    classes.input_firstchild
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                aria-label='password'
                                                label='Password'
                                                type='password'
                                                inputProps={{ minLength: 6 }}
                                                name='password'
                                                className={styles.input}
                                                onFocus={toggleFocus}
                                                onBlur={toggleFocus}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='start'>
                                                            <Typography
                                                                style={{
                                                                    color:
                                                                        focus &&
                                                                        '#3a8dff',
                                                                    fontSize:
                                                                        'smaller',
                                                                }}
                                                            >
                                                                Forgot?
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                        >
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                size='large'
                                                className={classes.authBtn}
                                            >
                                                Login
                                            </Button>
                                        </Box>
                                    </Grid>
                                </form>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => {
            dispatch(login(credentials));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
