import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Grid,
    Box,
    Paper,
    Button,
    Typography,
    FormControl,
    TextField,
    FormHelperText,
} from '@material-ui/core';
import { register } from './store/utils/thunkCreators';

import Bubble from './assets/bubble.svg';
import styles from './styles/signup/signup.module.css';

const Login = props => {
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
        <Box className={styles.root}>
            <Paper className={styles.paper}>
                <Grid container spacing={0}>
                    <Grid
                        item
                        xs={12}
                        sm={5}
                        container
                        className={styles.bg_image}
                    >
                        <Grid
                            item
                            container
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Box className='bubble'>
                                <img
                                    src={Bubble}
                                    alt='Bubble'
                                    className='bubble_img'
                                />
                            </Box>
                            <Typography
                                variant='h5'
                                align='center'
                                className={styles.bg_text}
                                style={{ color: '#fff' }}
                            >
                                Converse with anyone with any language
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        container
                        alignItems='center'
                        justifyContent='center'
                    >
                        <div className={styles.right}>
                            <Box
                                className={styles.account}
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
                                    <p
                                        className={styles.account_text}
                                        style={{ color: '#aaa' }}
                                    >
                                        Already have an account?
                                    </p>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        className={
                                            styles.button + ' ' + styles.login
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
                                        <h2 style={{ textAlign: 'left' }}>
                                            Create an account.
                                        </h2>
                                        <FormControl>
                                            <TextField
                                                id='standard-basic'
                                                label='Username'
                                                aria-label='username'
                                                type='text'
                                                name='username'
                                                className={
                                                    styles.input +
                                                    ' ' +
                                                    styles.input_firstchild
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
                                                className={styles.input}
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
                                                className={styles.input}
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
                                                className={styles.authBtn}
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
