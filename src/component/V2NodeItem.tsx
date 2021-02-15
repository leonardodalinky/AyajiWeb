import { Container, Divider, Grid, Hidden, IconButton, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { NodeInfo } from "../api/api";
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { green, red, yellow } from "@material-ui/core/colors";
import NetworkCellIcon from '@material-ui/icons/NetworkCell';
import SignalCellularConnectedNoInternet3BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet3Bar';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  nodeGrid: {
    display: "flex"
  },
  nodeFontKey: {
    marginLeft: theme.spacing(2),
  },
  nodeFont: {
    marginLeft: theme.spacing(2),
    wordWrap: "break-word"
  },
  nodeGridCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  nodeGridRight: {
    marginLeft: "auto",
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  failPing: {
    color: red[500],
  },
  normalPing: {
    color: yellow[800],
  },
  succeedPing: {
    color: green[500],
  },
  span: {
    paddingTop: theme.spacing(4),
  }
}));

export interface V2NodeItemProps {
  nodeInfo: NodeInfo
}

const MdVDivider = () => {
  const classes = useStyles()
  return (
    <Hidden xsDown>
      <Grid item xs={1} className={classes.nodeGrid}>
        <Divider orientation="vertical" className={classes.nodeGridRight}/>
      </Grid>
    </Hidden>
  )
}

const HDivider = () => {
  return (
    <Grid item xs={12}>
      <Divider />
    </Grid>
  )
}

const XsHDivider = () => {
  return (
    <Hidden mdUp>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Hidden>
  ) 
}

interface FontItemProps {
  keys: string
  value: string
  display?: "initial" | "block" | "inline"
}

const NodeItemFontKV = (props: FontItemProps) => {
  const classes = useStyles()
  return (
    <Box display="inline">
      <Typography variant="body1" className={classes.nodeFontKey} display="inline">
        {props.keys}
      </Typography>
      <Typography variant="body1" className={classes.nodeFont} display="inline" {...props}>
        {props.value}
      </Typography>
    </Box>
  )
}

const V2NodeItem = (props: V2NodeItemProps) => {
  const classes = useStyles()
  const [copySuccess, setCopySuccess] = useState({active: false, msg: ""})
  let nodeInfo = props.nodeInfo

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} spacing={2} className={classes.nodeGrid}>
          <Typography variant="h4" className={classes.nodeGridCenter}>
            节点: {nodeInfo.name}
          </Typography>
        </Grid>
        <HDivider />
        <Grid item xs={12} md={5}>
          <NodeItemFontKV keys={"ID: "} value={nodeInfo.nodeId.toString()}/>
        </Grid>
        <XsHDivider />
        <MdVDivider />
        <Grid item xs={12} md={6}>
          <NodeItemFontKV keys={"位置: "} value={nodeInfo.location}/>
        </Grid>
        <HDivider />
        <Grid item xs={12} md={5}>
          <NodeItemFontKV keys={"服务商: "} value={nodeInfo.isp === undefined? "" : nodeInfo.isp}/>
        </Grid>
        <XsHDivider />
        <MdVDivider />
        <Grid item xs={12} md={6}>
          <NodeItemFontKV keys={"贡献者: "} value={nodeInfo.provider}/>
        </Grid>
        <HDivider />
        <Grid item xs={12} md={5}>
          <NodeItemFontKV keys={"延迟: "} value={nodeInfo.delay.toString() + " ms"}/>
          {
            nodeInfo.delay === -1?
            <IconButton 
            className={classes.iconButton} 
            color="inherit" 
            aria-label="ping-failed"
            size="small">
              <SignalCellularConnectedNoInternet3BarIcon fontSize="small" className={classes.failPing}/>
            </IconButton>
             :
            <IconButton 
             className={classes.iconButton} 
             color="inherit" 
             aria-label="ping-failed"
             size="small">
               <NetworkCellIcon fontSize="small" className={nodeInfo.delay >= 1000? classes.normalPing : classes.succeedPing}/>
             </IconButton>
          }
        </Grid>
        <XsHDivider />
        <MdVDivider />
        <Grid item xs={12} md={6}>
          <NodeItemFontKV keys={"上次 Ping 时间: "} value={nodeInfo.delayUpdatedAt === undefined? "" : nodeInfo.delayUpdatedAt}/>
        </Grid>
        <HDivider />
        <Grid item xs={12}>
          <NodeItemFontKV keys={"Vmess: "} value={nodeInfo.CodeVmess}/>
          <IconButton 
          className={classes.iconButton} 
          color="inherit" 
          aria-label="copy-vmess"
          size="medium"
          onClick={() => {
            navigator.clipboard.writeText(nodeInfo.CodeVmess)
            setCopySuccess({active: true, msg: `成功复制节点 ${nodeInfo.name} 的 Vmess！`})
          }}
          >
            <EventNoteIcon fontSize="small"/>
          </IconButton>
        </Grid>
        <HDivider />
        {
          nodeInfo.description === undefined || nodeInfo.description === ""?
          null :
          <>
            <Grid item xs={12}>
              <NodeItemFontKV keys={"描述: "} value={nodeInfo.description} display="block"/> 
            </Grid>
            <HDivider />
          </>
        }
      </Grid>
      <Snackbar 
      open={copySuccess.active} 
      autoHideDuration={5000} 
      onClose={() => {setCopySuccess({active: false, msg: ""})}} 
      anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
        <Alert onClose={() => {setCopySuccess({active: false, msg: ""})}} severity="success" variant="filled">
          {copySuccess.msg}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default V2NodeItem