import {
  Container, IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import {green, red, yellow} from "@material-ui/core/colors";
import api, {BaseRes, BaseResWithPayload, ProxyInfo} from "../api/api";
import React, {useEffect, useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {AxiosError, AxiosResponse} from "axios";
import EventNoteIcon from "@material-ui/icons/EventNote";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  cell: {
    display: "flex",
    textAlign: "center"
  }
}));

interface GettingInfo {
  bar_open: boolean
  done: boolean
  error?: string
}

const ProxyPage = () => {
  const classes = useStyles()
  const userStatus = useSelector((state: RootState) => state.user);
  const [copySuccess, setCopySuccess] = useState({active: false, msg: ""})
  const [getting_info, set_getting_info] = useState<GettingInfo>({bar_open: true, done: false})
  const [sub_obj, set_sub_obj] = useState<Array<ProxyInfo>>(new Array(0))

  useEffect(() => {
    api.proxy.getProxy(userStatus.token).then((res: AxiosResponse<BaseResWithPayload<Array<ProxyInfo>>>) => {
      let payload = res.data.payload
      set_sub_obj(payload)
      set_getting_info({bar_open: true, done: true})
    }).catch((err: AxiosError<BaseRes>) => {
      console.log(err.response)
      if (err.response?.status === 401) {
        set_getting_info({bar_open: true, done: true, error: "未登录"})
      } else {
        set_getting_info({bar_open: true, done: true, error: "未知错误. " + err.response?.data})
      }
    })
  }, [userStatus.token])

  const ProxyRows = () => {
    let ret = new Array(0)
    sub_obj.forEach((item, idx) => {
      ret.push(
        <TableRow>
          <TableCell className={classes.cell}>
            <Typography variant="body1" style={{textAlign: "center"}}>{item.name}</Typography>
            <IconButton
              className={classes.iconButton}
              color="inherit"
              aria-label={"copy " + item.name}
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(item.sub_url).then(() => {
                  setCopySuccess({active: true, msg: `成功复制 ${item.name} 的订阅地址！`})
                }).catch((err) => {
                  console.error(err)
                })
              }}
            >
              <EventNoteIcon fontSize="small"/>
            </IconButton>
          </TableCell>
          <TableCell>
            <Typography variant="body1">{item.sub_url}</Typography>
          </TableCell>
        </TableRow>
      )
    })
    return <>{ret}</>
  }

  const BarAlert = () => {
    return <>
      {
        getting_info.done && getting_info.error != null?
          <Alert
            onClose={() => {
              set_getting_info({...getting_info, bar_open: false})
            }}
            severity="error" variant="filled">
            {getting_info.error}
          </Alert> : null
      }
      {
        getting_info.done && getting_info.error == null?
          <Alert
            onClose={() => {
              set_getting_info({...getting_info, bar_open: false})
            }}
            severity="success" variant="filled">
            更新代理列表成功！
          </Alert> : null
      }
      {
        !getting_info.done?
          <Alert
            onClose={() => {
              set_getting_info({...getting_info, bar_open: false})
            }}
            severity="info" variant="filled">
            正在获取代理列表...
          </Alert> : null
      }
    </>
  }

  return <>
    <Container maxWidth="lg">
      <Paper>
        <Table aria-label="proxy info">
          <TableHead>
            <TableCell><Typography variant="h5">代理软件</Typography></TableCell>
            <TableCell><Typography variant="h5">订阅地址(URL)</Typography></TableCell>
          </TableHead>
          <TableBody>
            {/* 数据项 */}
            <ProxyRows />
          </TableBody>
        </Table>
      </Paper>
    </Container>
    <Snackbar
      open={getting_info.bar_open}
      autoHideDuration={5000}
      onClose={() => {set_getting_info({...getting_info, bar_open: false})}}
      anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
      <BarAlert />
    </Snackbar>
    <Snackbar
      open={copySuccess.active}
      autoHideDuration={5000}
      onClose={() => {setCopySuccess({active: false, msg: ""})}}
      anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
      <Alert onClose={() => {setCopySuccess({active: false, msg: ""})}} severity="success" variant="filled">
        {copySuccess.msg}
      </Alert>
    </Snackbar>
  </>
}
export default ProxyPage