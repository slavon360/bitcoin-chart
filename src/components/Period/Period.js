import React from 'react';
import classes from './Period.css';

const period = props => (
    <div className={classes.PeriodWrp}>
      <select
        onChange={(e) => {
          props.setTimeParam(e.target.value)
        }}>
        {props.timeParams.map((param) => {
          return  <option
                    value={param.title}
                    key={param.title}>
                    {param.title}
                  </option>
        })}
      </select>
    </div>
)

export default period;
