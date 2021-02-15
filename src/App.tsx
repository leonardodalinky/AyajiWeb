import React, { useEffect } from 'react'
import NavBar from './component/NavBar'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ParticlesBg from 'particles-bg';
import MainPage from './component/MainPage';
import V2Page from './component/V2Page';
import LoginPage from './component/LoginPage'
import { RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import docCookies from './util/cookie';
import { login } from './redux/user';

function App() {
  var dispatch = useDispatch()
  var userStatus = useSelector((state: RootState) => state.user)
  // 从 localStorage 中获取已登录信息
  useEffect(() => {
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
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/v2ray">
        {
          userStatus.isLogin?
          <V2Page /> : null
        }
      </Route>
      <ParticlesBg type="cobweb" bg={true} color="#ffffff"/>
    </Router>
  );
}

export default App;
