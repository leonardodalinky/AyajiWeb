import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { SvgIcon } from '@material-ui/core';
import V2rayIcon from '../img/navbar/SvgV2ray'
import MarkdownIcon from '../img/navbar/SvgMarkdown';
import { useHistory } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  // 登录暂时未实现
  const [userErrOpen, setUserErrOpen] = React.useState(false);
  const handleClose = () => {
    setUserErrOpen(false);
  };

  var userStatus = useSelector((state: RootState) => state.user)
  const clickOnVray = () => {
    if (!userStatus.isLogin) {
      setUserErrOpen(true)
    } else {
      history.push("/v2ray");
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={() => {history.push("/")}}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AyajiLin's Website
          </Typography>
          <IconButton 
          className={classes.iconButton} 
          color="inherit" 
          aria-label="v2ray"
          href="https://hackmd.ayajike.xyz"
          >
            <SvgIcon component={MarkdownIcon} viewBox="0 0 208 128"/>
          </IconButton>
          <IconButton 
          className={classes.iconButton} 
          color="inherit" 
          aria-label="v2ray" 
          onClick={clickOnVray}>
            <SvgIcon component={V2rayIcon} viewBox="0 0 128 128"/>
          </IconButton>
          {
            userStatus.isLogin?
            <Button color="inherit">{userStatus.username}</Button> :
            <Button color="inherit" onClick={() => {history.push("/login")}}>登录</Button>
          }
        </Toolbar>
      </AppBar>
      <Snackbar open={userErrOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          尚未登陆！
        </Alert>
      </Snackbar>
    </div>
  );
}
