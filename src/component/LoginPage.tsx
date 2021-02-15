import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import api from '../api/api';
import { BaseRes } from '../api/api'
import { AxiosError, AxiosResponse } from 'axios';
import { login } from '../redux/user'
import { useDispatch } from 'react-redux';
import docCookies from '../util/cookie';
import { useHistory } from 'react-router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        AyajiLin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.contrastText,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  var dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()
  // 记住密码
  const [rem, setRem] = useState(true)
  // 已输入的用户名
  const [username, SetUsername] = useState("")
  // 错误时显示提示
  const [wrong, setWrong] = useState({active: false, msg: ""})
  // 登录按钮的行为
  const clickLogin = () => {
    api.login.PostLogin(username).then((res: AxiosResponse<BaseRes>) => {
      let data = res.data
      // var userId = data.payload["userId"]
      var user = data.payload["username"]
      var jwt = data.payload["jwt"]
      // 写入 cookie
      docCookies.setItem("jwt", jwt, 7 * 24 * 3600, "/")
      docCookies.setItem("username", user, 7 * 24 * 3600, "/")
      // docCookies.setItem("userId", userId, 7 * 24 * 3600, "/")
      // 更新 redux 状态
      dispatch(login({
        userId: 0,
        username: user,
        token: jwt
      }))
      // 跳转到主页面
      history.push("/")
    }).catch((error: AxiosError<BaseRes>) => {
      let res = error.response
      let data = res?.data
      setWrong({
        active: true,
        msg: `登录失败(${data?.code}): ${data?.msg}`
      })
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登录
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="创始人中文名(其中之一)"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => {
              e.preventDefault();
              SetUsername(e.target.value)
            }}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rem} disabled={true}
            onChange={(e: any, checked: boolean) => {
              setRem(checked)
            }}/>}
            label="记住我"
          />
          {
            wrong.active?
            <Typography>
              {wrong.msg}
            </Typography> : null
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={clickLogin}
          >
            登录
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘记密码?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"没有帐户? 注册"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}