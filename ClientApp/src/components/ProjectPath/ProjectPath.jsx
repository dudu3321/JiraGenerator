import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, FormControl, TextField, Container } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  }
}));

function ProjectPath(props) {
  const [projectList, setProjectList] = useState([]);
  const [name, setName] = useState([]);
  const [path, setPath] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    Init();
  }, [])

  async function Init() {
    const response = await fetch('project');
    const data = await response.json();
    if (data !== null) {
      setProjectList(data);
    }
  }

  function hendleDelete(index) {
    let newList = projectList.filter((v, i) => i !== index);
    SendNewList(newList, 'Remove Success!');
  }

  function handleProjectAdd() {
    let newList = [...projectList, { name: name, path: path}];
    SendNewList(newList, 'Add Success!');
  }

  function SendNewList(newlist, alertString){
    fetch('project', {
      method: 'POST',
      body: JSON.stringify(newlist),
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
    }).then(response => {
      alert(alertString);
      setProjectList(newlist);
    });
  }

  return <div>
    <Container>
      <FormControl className={classes.margin}>
        <TextField type="text" id="text_name" label="Name" className="text_field" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl className={classes.margin}>
        <TextField type="text" id="text_path" label="Path" className="text_field" value={path} onChange={(e) => setPath(e.target.value)} />
      </FormControl>
      <FormControl className={classes.margin}>
        <Button id="button_add" variant="contained" onClick={handleProjectAdd}>Add</Button>
      </FormControl>
    </Container>
    <Table aria-label="simple table">
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>No.</StyledTableCell>
          <StyledTableCell>Project</StyledTableCell>
          <StyledTableCell>Project Path</StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {
          projectList.map((item, index) => {
            return <StyledTableRow key={index + 1}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell>{item.path}</StyledTableCell>
              <StyledTableCell>
                <Button variant="outlined" color="secondary" onClick={(e) => hendleDelete(index)}>Remove</Button>
              </StyledTableCell>
            </StyledTableRow>
          })
        }
      </TableBody>
    </Table>
  </div>;
};

ProjectPath.propTypes = {
  // bla: PropTypes.string,
};

ProjectPath.defaultProps = {
  // bla: 'test',
};

export default ProjectPath;
