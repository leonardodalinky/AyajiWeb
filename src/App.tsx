import React, { useEffect } from 'react'
import NavBar from './component/NavBar'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import MainPage from './component/MainPage';
import ProxyPage from './component/ProxyPage';
import LoginPage from './component/LoginPage'
import { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import docCookies from './util/cookie';
import { login } from './redux/user';
import api from './api/api';
import Box from '@material-ui/core/Box';
import ParticlesBg from 'particles-bg';
import { Hidden } from '@material-ui/core';
import NavDrawer from './component/NavDrawer';
import ayajiConstants from './ayajiConstants';
import NotFoundPage from './component/NotFoundPage';
import AboutPage from './component/AboutPage';

function App() {
  var dispatch = useDispatch()
  var userStatus = useSelector((state: RootState) => state.user)
  // 从 localStorage 中获取已登录信息
  useEffect(() => {
    // 从 cookie 中获取之前的登录状况
    var username = docCookies.getItem("username")
    var jwt = docCookies.getItem("jwt")
    if (username == null || jwt == null) {
      return
    }
    dispatch(login({
      userId: 0,
      username: username,
      token: jwt
    }))
    // 增加一次站内统计计数
    api.statistic.postAddVisit()
  }, [dispatch])

  return (
  <>
    <Router>
      <NavBar />
      <NavDrawer />
      <Switch>
        <Route exact path={ayajiConstants.innerUrl.home}>
          <Box display="flex">
            <MainPage />
          </Box>
        </Route>
        <Route path={ayajiConstants.innerUrl.login}>
          <LoginPage />
        </Route>
        <Route path={ayajiConstants.innerUrl.proxy}>
          {
            // userStatus.isLogin? <V2Page /> : null
            // userStatus.isLogin? <ProxyPage /> : null
            <ProxyPage />
          }
        </Route>
        <Route path={ayajiConstants.innerUrl.about}>
          <AboutPage />
        </Route>
        {/* 默认 page not found */}
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
    <Hidden mdUp>
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={30}/>
    </Hidden>
    <Hidden smDown>
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={60}/>
    </Hidden>
  </>
  );
}

export default App;
