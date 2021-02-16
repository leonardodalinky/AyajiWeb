import { Avatar, Box, Container, Divider, Link, makeStyles, Paper, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import ayajiConstants from "../ayajiConstants";
import { version } from '../../package.json';

// TODO 将这种键值对表格整理为独立的组件

const useStyles = makeStyles((theme) => ({
  headerCell: {
    minWidth: theme.spacing(10),
    width: theme.spacing(20),
  },
  webIcon: {
    width: theme.spacing(24),
    height: theme.spacing(24),
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const WebIcon = () => {
  const classes = useStyles()
  
  return (
    <>
      <Box width="auto" mb={2}>
        <Avatar alt="WebsiteIcon" src={ayajiConstants.innerUrl.websiteIcon} className={classes.webIcon}/>
      </Box>
    </>
  )
}

const AboutPage = () => {
  const classes = useStyles()

  const HeaderCell = (props: {children: NonNullable<React.ReactNode>}) => {
    return (
      <TableCell className={classes.headerCell}>
        <Typography variant="body1">
          {props.children}
        </Typography>
      </TableCell>
    )
  }

  const ContentCell = (props: {children: NonNullable<React.ReactNode>}) => {
    return (
      <TableCell align="left">
        <div>
        <Typography variant="body1">
          {props.children}
        </Typography>
        </div>
      </TableCell>
    )
  }

  return (
    <Container>
      <Paper>
        <WebIcon />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <HeaderCell>项目名称: </HeaderCell>
              <ContentCell>AyajiWeb</ContentCell>
            </TableRow>
            <TableRow>
              <HeaderCell>项目版本: </HeaderCell>
              <ContentCell>{version}</ContentCell>
            </TableRow>
            <TableRow>
              <HeaderCell>作者: </HeaderCell>
              <ContentCell>Leonardodalinky</ContentCell>
            </TableRow>
            <TableRow>
              <HeaderCell>邮箱: </HeaderCell>
              <ContentCell>493987054@qq.com</ContentCell>
            </TableRow>
            <TableRow>
              <HeaderCell>Github: </HeaderCell>
              <ContentCell>
                <Link href="https://github.com/leonardodalinky/AyajiWeb">github.com/leonardodalinky/AyajiWeb</Link>
                <Link href="https://github.com/leonardodalinky/AyajiWeb">
                  <img 
                  src="https://img.shields.io/github/stars/leonardodalinky/AyajiWeb?style=social" 
                  alt="github-stat" 
                  style={{marginLeft: "1em"}}
                  onClick={() => {}}
                  />
                </Link>
              </ContentCell>
            </TableRow> 
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export default AboutPage
