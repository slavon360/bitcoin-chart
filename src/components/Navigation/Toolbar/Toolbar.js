import React from 'react';
import Period from '../../Period/Period';
import classes from './Toolbar.css';

const toolbar = props => (
    <div className={classes.ToolbarWrp}>
      <Period timeParams={props.timeParams} setTimeParam={props.setTimeParam}/>
    </div>
);

export default toolbar;
