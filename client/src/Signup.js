import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid,
    Box,
    Paper,
    Button,
    FormControl,
    TextField,
    FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { register } from './store/utils/thunkCreators';

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
    login: {
        width: '170px',
        padding: theme.spacing(7.5, 15),
        color: theme.palette.primary.main,
        background: '#fff',
        boxShadow: '0px 2px 6px rgba(74, 106, 149, 0.2)',
        filter: 'drop-shadow(0px 2px 6px rgba(74, 106, 149, 0.2))',
        [theme.breakpoints.down('sm')]: {
            fontSize: 'small',
            width: 'auto',
            padding: theme.spacing(5, 25),
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(5, 22.5),
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
}));

const Login = ({ user, register }) => {
    const classes = useStyles(theme);

    const history = useHistory();
    const [formErrorMessage, setFormErrorMessage] = useState({});

    const handleRegister = async event => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (username.length === 0) {
            setFormErrorMessage({
                usernameIsRequired: 'Username is required',
            });
            setTimeout(
                () =>
                    setFormErrorMessage({
                        ...formErrorMessage,
                        usernameIsRequired: '',
                    }),
                5000,
            );
            return;
        }
        if (email.length === 0) {
            setFormErrorMessage({
                ...formErrorMessage,
                emailIsRequired: 'E-mail is required',
            });
            setTimeout(
                () =>
                    setFormErrorMessage({
                        ...formErrorMessage,
                        emailIsRequired: '',
                    }),
                5000,
            );
            return;
        }
        if (password.length < 6) {
            setFormErrorMessage({
                passwordLength: 'Password must be at least 6 characters',
            });
            setTimeout(
                () =>
                    setFormErrorMessage({
                        ...formErrorMessage,
                        passwordLength: '',
                    }),
                5000,
            );
            return;
        }

        await register({ username, email, password });
    };

    if (user.id) {
        return <Redirect to='/home' />;
    }

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
                                className={classes.account}
                                position='absolute'
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
                                        Already have an account?
                                    </p>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        className={classes.login}
                                        onClick={() => history.push('/login')}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Box>
                            <Grid item container justifyContent='center'>
                                <form
                                    noValidate
                                    autoComplete='off'
                                    onSubmit={handleRegister}
                                >
                                    <Grid item container direction='column'>
                                        <h2 align='left'>Create an account.</h2>
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
                                            <FormHelperText>
                                                {
                                                    formErrorMessage.usernameIsRequired
                                                }
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                label='E-mail address'
                                                aria-label='e-mail address'
                                                type='email'
                                                name='email'
                                                className={classes.input}
                                            />
                                            <FormHelperText>
                                                {
                                                    formErrorMessage.emailIsRequired
                                                }
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                aria-label='password'
                                                label='Password'
                                                type='password'
                                                inputProps={{ minLength: 6 }}
                                                name='password'
                                                className={classes.input}
                                            />
                                            <FormHelperText>
                                                {
                                                    formErrorMessage.passwordLength
                                                }
                                            </FormHelperText>
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
                                                Create
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
        register: credentials => {
            dispatch(register(credentials));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
