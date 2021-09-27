import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Box, Divider, Fade, Hidden, Menu, MenuItem, SvgIcon, Tabs } from '@material-ui/core';
import ProxyIcon from "../img/navbar/ProxyIcon";
import MarkdownIcon from '../img/navbar/MarkdownIcon';
import { useHistory } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleDrawer } from '../redux/uiconfig';
import api from '../api/api';
import ayajiConstants from '../ayajiConstants';
import { Tab } from '@material-ui/core';
import HexoIcon from "../img/navbar/HexoIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "transparent",
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    margin: theme.spacing(2),
  },
  textButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },  
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // 未登录时的提醒
  const [userErrOpen, setUserErrOpen] = useState(false)
  const handleUserErrClose = () => {
    setUserErrOpen(false);
  }

  // 用户信息
  var userStatus = useSelector((state: RootState) => state.user)

  // 点击用户
  const [anchorProfileEl, setAnchorProfileEl] = React.useState<null | HTMLElement>(null);
  const handleProfileClose = () => {
    setAnchorProfileEl(null)
  }

  // 登出账户的行为
  const logOff = () => {
    api.logoff.logoff()
    window.location.pathname = ayajiConstants.innerUrl.home
  }

  // 导航栏图标列表
  const NavBarIcons = () => {
    return (
      <>
        <Tabs 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="nav-tabs"
        >
          {/* proxy 图标登陆后显示 */}
                    {
            userStatus.isLogin?
            <>
              <Tab label="Proxy" icon={<SvgIcon component={ProxyIcon} viewBox="0 0 256 256"/>}
                onClick={() => {history.push(ayajiConstants.innerUrl.proxy)}}
              />
            </>
            : null
          }
          <Tab label="HackMD" icon={<SvgIcon component={MarkdownIcon} viewBox="0 0 208 128"/>}
            onClick={() => {window.location.assign(ayajiConstants.extUrl.hackmd)}}
          />
          <Tab label="Hexo 博客" icon={<SvgIcon component={HexoIcon} viewBox="0 0 512 512"/>}
               onClick={() => {window.location.assign(ayajiConstants.extUrl.hexo)}}
          />
        </Tabs>
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={() => {dispatch(toggleDrawer(true))}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AyajiWeb
          </Typography>
          {/* 图标列表 */}
          <Hidden xsDown>
            <NavBarIcons />
          </Hidden>
          {
            !userStatus.isLogin?
            <Button color="inherit" onClick={() => {history.push(ayajiConstants.innerUrl.login)}}>登录</Button>:
            <IconButton 
            className={classes.iconButton} 
            color="inherit" 
            aria-label="avatar"
            onClick={(e) => {setAnchorProfileEl(e.currentTarget)}}
            >
              <Avatar alt="avatar" src={ayajiConstants.innerUrl.defaultAvatar} className={classes.avatar}/>
            </IconButton>
          }
        </Toolbar>
      </AppBar>
      <Menu
        id="profile-menu"
        anchorEl={anchorProfileEl}
        keepMounted
        open={Boolean(anchorProfileEl)}
        onClose={handleProfileClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {handleProfileClose(); history.push(ayajiConstants.innerUrl.profile);}}>个人中心</MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleProfileClose(); logOff();}}>注销</MenuItem>
      </Menu>
      <Snackbar open={userErrOpen} autoHideDuration={5000} onClose={handleUserErrClose} anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
        <Alert onClose={handleUserErrClose} severity="error" variant="filled">
          尚未登陆！
        </Alert>
      </Snackbar>
    </div>
  );
}
