import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  taskBar: {
    backgroundColor: 'silver',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  return (
    <CardContent className={classes.taskBar}>
      <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} sm={6}>
         A
        </Grid>
        <Grid item xs={12} sm={6}>
         B
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default Dashboard;
