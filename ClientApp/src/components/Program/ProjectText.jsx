import React from "react";
import { TextField, Box } from '@material-ui/core';

export const ProjectText = (props) => {
    const HEADER = "||Project Name||Project Path||Branch Name||Version||Note||\n";
    let resltStr = '';
    if (props.result.length > 0) {
        resltStr += HEADER;
        props.result.forEach(element => {
            resltStr += `|${element.name}|${element.path}|${element.branch}| |${element.comment}|\n`
        });
    }

    const style={
        width: '50vw'
    };

    return <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height:'30vh'
        }}>
        <TextField
            multiline
            defaultValue={resltStr}
            style={style}
            rows={10}
            variant="outlined"
            placeholder="Result" />
    </Box>;
}
