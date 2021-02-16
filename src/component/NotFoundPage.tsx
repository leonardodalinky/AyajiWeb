import { Box, Hidden, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  middle: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    minWidth: '90%',
    transform: 'translate(-50%, -50%)'
  },
  textMain: {
    color: "#ffffff",
    wordWrap: "break-word"
  },
}));

const NotFoundPage = () => {
  const classes = useStyles()

  return (
    <>
      <Hidden xsDown>
        <Box className={classes.middle} justifyContent="center" alignContent="center">
          <Box>
            <Typography variant="h3" align="center" className={classes.textMain}>
              🤡此页面还在建设中😅
            </Typography>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box className={classes.middle} justifyContent="center" alignContent="center">
          <Box>
            <Typography variant="h5" align="center" className={classes.textMain}>
              🤡此页面还在建设中😅
            </Typography>
          </Box>
        </Box>
      </Hidden>
    </>
  )
}

export default NotFoundPage
