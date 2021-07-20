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
    FormHelperText,
    Typography,
} from '@material-ui/core';

import { login } from './store/utils/thunkCreators';

import Bubble from './assets/bubble.svg';
import styles from './styles/signup/signup.module.css';

const Login = props => {
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

    const Focus = e => {
        setFocus(true);
    };
    const FocusOut = e => {
        setFocus(false);
    };

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
                            <Box className='bubble' top={'calc(50vh - 20%)'}>
                                <img src={Bubble} alt='Bubble' />
                            </Box>
                            <Typography
                                variant='h5'
                                align='center'
                                className={styles.bg_text}
                                style={{
                                    color: '#fff',
                                }}
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
                        <div className={styles.right} style={{ width: '100%' }}>
                            <Box
                                position='absolute'
                                className={styles.account}
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
                                        style={{
                                            color: '#aaa',
                                        }}
                                    >
                                        Don't have an account?
                                    </p>
                                    <Button
                                        variant='contained'
                                        size='large'
                                        className={styles.button}
                                        onClick={() =>
                                            history.push('/register')
                                        }
                                        style={{
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                        }}
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
                                        <h2 style={{ textAlign: 'left' }}>
                                            Welcome back!
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
                                                onFocus={Focus}
                                                onBlur={FocusOut}
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
                                            <FormHelperText>
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
