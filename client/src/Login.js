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

import Left from './components/Authentication/Left';
import { theme } from './themes/theme';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: 'auto',
    },
    right: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            minHeight: '100vh',
        },
    },
    account: {
        margin: theme.spacing(12, 15),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(5, 7.5),
        },
    },
    accountText: {
        marginRight: theme.spacing(12.5),
        color: theme.palette.secondary.main,

        [theme.breakpoints.down('md')]: {
            fontSize: 12,
        },
        [theme.breakpoints.down('msm')]: {
            fontSize: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(5),
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 'smaller',
        },
    },
    button: {
        width: '170px',
        padding: theme.spacing(7.5, 15),
        color: theme.palette.primary.main,
        background: '#fff',
        boxShadow: '0px 2px 6px rgba(74, 106, 149, 0.2)',
        filter: 'drop-shadow(0px 2px 6px rgba(74, 106, 149, 0.2))',

        [theme.breakpoints.down('sm')]: {
            fontSize: 'small',
            width: 'auto',
            padding: theme.spacing(5, 7.5),
        },
    },
    input: {
        width: 'calc((100vw / 2) - 80px)',
        marginTop: theme.spacing(20),
        [theme.breakpoints.down('sm')]: {
            width: '80vw',
        },
    },
    inputFirstchild: {
        width: 'calc((100vw / 2) - 80px)',
        [theme.breakpoints.down('sm')]: {
            width: '80vw',
        },
        marginTop: theme.spacing(),
    },
    authBtn: {
        padding: theme.spacing(7.5, 15),
        color: '#fff',
        background: theme.palette.primary.main,
        width: '170px',
        marginTop: theme.spacing(25),
    },
    forgotPassword: {
        color: theme.palette.primary.main,
        fontSize: 'smaller',
    },
}));

const Login = ({ user, login }) => {
    const classes = useStyles(theme);
    const [focus, setFocus] = React.useState(false);
    const history = useHistory();

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
                        md={7}
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
                                    <p className={classes.accountText}>
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
                                                    classes.inputFirstchild
                                                }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                aria-label='password'
                                                label='Password'
                                                type='password'
                                                name='password'
                                                inputProps={{ minLength: 6 }}
                                                className={classes.input}
                                                onFocus={toggleFocus}
                                                onBlur={toggleFocus}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='start'>
                                                            <Typography
                                                                className={
                                                                    focus &&
                                                                    classes.forgotPassword
                                                                }
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
