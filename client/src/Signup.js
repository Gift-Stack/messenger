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
        [theme.breakpoints.down(600)]: {
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
    login: {
        [theme.breakpoints.down('sm')]: {
            padding: '10px 50px',
        },
        [theme.breakpoints.down(345)]: {
            padding: '10px 45px',
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

    const history = useHistory();
    const { user, register } = props;
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
                        sm={7}
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
                                    <p className={classes.account_text}>
                                        Already have an account?
                                    </p>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        className={
                                            classes.button + ' ' + classes.login
                                        }
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
                                                    classes.input +
                                                    ' ' +
                                                    classes.input_firstchild
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
