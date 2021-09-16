import React from "react";
import { TextField } from '@material-ui/core';

export const ProjectText = (props) => {
    const HEADER = "||Project Name||Project Path||Branch Name||Version||Note||";
    let resltStr = '';
    if (props.result.length > 0) {
        resltStr += HEADER;
        props.result.forEach(element => {
            resltStr += `|${element.name}|${element.path}|${element.branch}| |${element.commont}|`
        });
    }

    return <TextField multiline value={resltStr}>
    </TextField>;
}
