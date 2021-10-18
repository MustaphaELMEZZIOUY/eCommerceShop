import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        "&:hover": {
            boxShadow: "1px 5px 6px 5px #ccc"
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundSize: 'contain'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cardIcon: {
        "&:hover": {
            boxShadow: "1px 1px 1px 1px red"
        }
    }
}))

