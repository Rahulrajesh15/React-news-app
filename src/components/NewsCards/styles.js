import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: '0 5%',
        width: '100%',
        marginTop: '2%',
        marginBottom: '5%',
        position: 'sticky'
    },
    logoContainer: {
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        position: 'sticky',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse',
          textAlign: 'center',
        },
      },
      alanLogo: {
        height: '27vmin',
        borderRadius: '15%',
        padding: '0 5%',
        margin: '0 0 3%',
        [theme.breakpoints.down('sm')]: {
          height: '35vmin',
        },
      },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '50vh',
        padding: '5%',
        borderRadius: 10,
        color: 'white'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
}));