import React from "react";
import { TextField, Box } from '@material-ui/core';

export const ProjectText = (props) => {
    const style={
        width: '50vw'
    };

    return <Box
        sx={{
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height:'30vh'
        }}>
        <TextField
            multiline
            defaultValue={props.result.replaceAll('\n','').length === 0 ? '' : props.result }
            style={style}
            rows={10}
            variant="outlined"
            placeholder="Result" />
    </Box>;
}
