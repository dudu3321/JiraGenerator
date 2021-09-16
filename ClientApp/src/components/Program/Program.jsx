import React, { useEffect, useState } from "react";
import { ProjectResult } from './ProjectResult';
import { Button, InputLabel, Select, MenuItem, FormControl, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Program.css';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  minWidth: {
    minWidth: 150
  }
}));

function Program() {
  const [projectlist, setProjectList] = useState([]);
  const [project, setProject] = useState({});
  const [selectedProjects, setSelectedProject] = useState([]);
  const [commitFrom, setCommitFrom] = useState(0);
  const [commitTo, setCommitTo] = useState(0);
  const [branchDomain, setbranchDomain] = useState('');
  const [branch, setbranch] = useState('');
  const [openComment, setOpenComment] = useState([false,false,false,false,false,false,false,false,false]);
  const classes = useStyles();
  const branchList = ["", "CREDIT", "ITNOCPR", "TCPR", "PRJSA"];
  useEffect(() => {
    Init();
  }, [])
  
  async function Init() {
    const response = await fetch('project');
    const data = await response.json();
    if (data !== null) {
      setProject(data[0]);
      setProjectList(data);
    }
  }

  function handleProjectChange(e) {
    setProject(projectlist.find(x => x.name === e.target.value));
  }

  function handleProjectAdd() {
    setSelectedProject([...selectedProjects, {
      project: project,
      commitFrom: commitFrom,
      commitTo: commitTo,
      branchDomain: branchDomain,
      branch: branch
    }]);

    let newArray = [...openComment];
    for (let i = commitFrom; i <= commitTo; i++) {
      newArray[i-1] = true;
    }
    setOpenComment(newArray);
  }

  function hendleDelete(index) {
    setSelectedProject(selectedProjects.filter((v, i) => i !== index));
  }

  return <div>
   <Container>
      <FormControl className={classes.margin}>
        <InputLabel id="select_project">專案名稱</InputLabel >
        <Select name="select_project" id="select_project"  displayEmpty={false} onChange={handleProjectChange} className={classes.minWidth}>
          {
            projectlist.map((item, index) => {
              return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <TextField type="number" id="text_comment_from" label="備註起始" className="text_field" InputProps={{ inputProps: { min: 0, max: 9 } }} value={commitFrom} onChange={(e) => setCommitFrom(e.target.value)} />
      </FormControl>
      <FormControl className={classes.margin}>
        <TextField type="number" id="text_comment_to" label="備註結束" className="text_field" InputProps={{ inputProps: { min: 0, max: 9 } }} value={commitTo} onChange={(e) => setCommitTo(e.target.value)} />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="select_branch_domain">Branch Domain</InputLabel>
        <Select name="select_branch_domain" id="select_branch_domain" value={branchDomain} onChange={(e) => setbranchDomain(e.target.value)} className={classes.minWidth}>
          {
            branchList.map(item => {
              return <MenuItem key={item} value={item}>{item}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <TextField type="text" id="text_branch" label="Branch"  value={branch} onChange={(e) => setbranch(e.target.value)} />
      </FormControl>
      <Button id="button_add" variant="contained" onClick={handleProjectAdd}>Add</Button>
    </Container>
    <ProjectResult projects={selectedProjects} hendleDelete={hendleDelete}></ProjectResult>
  </div>
};

export default Program;
