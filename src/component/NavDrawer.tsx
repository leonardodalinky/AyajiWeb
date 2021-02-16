import { Box, Divider, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, SvgIcon, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from "../redux/store"
import Drawer from '@material-ui/core/Drawer';
import { toggleDrawer } from "../redux/uiconfig";
import React from "react";
import V2rayIcon from "../img/navbar/V2rayIcon";
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import clsx from "clsx";
import MarkdownIcon from "../img/navbar/MarkdownIcon";
import { useHistory } from "react-router";
import InfoIcon from '@material-ui/icons/Info';
import ayajiConstants from "../ayajiConstants";
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: "rgba(235,235,235,0.95)"
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto"
  },
  textAvatar: {
    marginTop: theme.spacing(2),
  }
}));

const NavAvatar = () => {
  const classes = useStyles()
    // 登录信息
    var userStatus = useSelector((state: RootState) => state.user)

  return (
    <>
      <Box width="auto">
        <Avatar alt="LargeAvatar" src={ayajiConstants.innerUrl.defaultAvatar} className={classes.largeAvatar}/>
        <Typography align="center" className={classes.textAvatar} color="textSecondary">
          {
            userStatus.isLogin?
            `用户名: ${userStatus.username}`
            :
            `尚未登录`
          }
        </Typography>
      </Box>
    </>
  )
}

const NavList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  // 登录信息
  var userStatus = useSelector((state: RootState) => state.user)

  const listHandleClick = (event: React.KeyboardEvent | React.MouseEvent,) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    dispatch(toggleDrawer(false))
  }

  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={listHandleClick}
      onKeyDown={listHandleClick}
    >
      <List>
        <Divider variant="middle"/>
        <ListSubheader>个人账户</ListSubheader>
        <ListItem button key="首页" onClick={() => {history.push(ayajiConstants.innerUrl.home)}}>
          <ListItemIcon><ExploreIcon/></ListItemIcon>
          <ListItemText primary="首页" />
        </ListItem>
        <ListItem button key="个人中心" onClick={() => {history.push(ayajiConstants.innerUrl.profile)}}>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary="个人中心" />
        </ListItem>
        {/* Start - 普通功能区 */}
        <Divider variant="middle"/>
        <ListSubheader>普通功能区</ListSubheader>
        <ListItem button key="HackMD" onClick={() => {window.location.assign(ayajiConstants.extUrl.hackmd)}}>
          <ListItemIcon><SvgIcon component={MarkdownIcon} viewBox="0 0 208 128"/></ListItemIcon>
          <ListItemText primary="HackMD" />
        </ListItem>
        {/* End - 普通功能区 */}
        {/* Start - 特别区 */}
        {
          userStatus.isLogin?
          <>
            <Divider variant="middle"/>
            <ListSubheader>特殊功能区</ListSubheader>
            <ListItem button key="V2ray"  onClick={() => {history.push(ayajiConstants.innerUrl.v2ray)}}>
              <ListItemIcon><SvgIcon component={V2rayIcon} viewBox="0 0 128 128"/></ListItemIcon>
              <ListItemText primary="V2ray" />
            </ListItem>
          </>
          : null
        }
        {/* End - 特别区 */}
        <Divider variant="middle"/>
        <ListItem button key="关于" onClick={() => {history.push(ayajiConstants.innerUrl.about)}}>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="关于" />
        </ListItem>
      </List> 
    </div>
  )
}

const NavDrawer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // 左侧抽屉开关
  var drawerState = useSelector((state: RootState) => state.uiConfig.drawerState)

  return (
    <>
      <Drawer
        classes={{paper: classes.paper}}
        anchor="left" 
        open={drawerState.open} 
        onClose={() => {dispatch(toggleDrawer(false));}}
      >
        <NavAvatar/>
        <NavList />
        <Box mt="2em" width="auto" ml="auto" mr="auto">
          <Link href="https://github.com/leonardodalinky/AyajiWeb">
            <img 
            src="https://img.shields.io/github/stars/leonardodalinky/AyajiWeb?style=social" 
            alt="github-stat" 
            style={{marginLeft: "1em"}}
            onClick={() => {}}
            />
          </Link>
        </Box>
      </Drawer>
    </>
  )
}

export default NavDrawer
