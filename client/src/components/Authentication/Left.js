import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Bubble from '../../assets/bubble.svg';
import Bg from '../../assets/bg-img.png';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(theme => ({
    bg_image: {
        background: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${Bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '0 0',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            height: '60vh',
        },
    },

    bubble: {
        position: 'absolute',
        top: '30%',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            top: 0,
        },
    },
    bg_text: {
        color: '#fff',
        maxWidth: '55%',
        [theme.breakpoints.down('lg')]: {
            maxWidth: '70%',
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '75%',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(10),
        },
    },
}));

const Left = () => {
    const classes = useStyles(theme);

    return (
        <Grid item xs={12} md={5} container className={classes.bg_image}>
            <Grid
                item
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
            >
                <Box className={classes.bubble}>
                    <img src={Bubble} alt='Bubble' />
                </Box>
                <Typography
                    variant='h5'
                    align='center'
                    className={classes.bg_text}
                >
                    Converse with anyone with any language
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Left;
