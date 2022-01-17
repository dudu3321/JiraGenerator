import React, { useEffect, useState } from "react";
import { ProjectResult } from './ProjectResult';
import { Button, InputLabel, Select, MenuItem, TextField, Checkbox, Grid, FormControl, FormControlLabel } from '@material-ui/core';
import './Program.css';

function Program() {
  const initOpenComment = [false, false, false, false, false, false, false, false, false];
  const [projectlist, setProjectList] = useState([]);
  const [project, setProject] = useState({});
  const [selectedProjects, setSelectedProject] = useState([]);
  const [commitFrom, setCommitFrom] = useState(0);
  const [commitTo, setCommitTo] = useState(0);
  const [branchDomain, setbranchDomain] = useState('');
  const [branch, setbranch] = useState('');
  const [withFeature, setWithFeature] = useState(false);
  const [openComment, setOpenComment] = useState(initOpenComment);
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
    let minCommit = 0;
    let maxCommit = 0;

    if (commitFrom != 0 || commitTo != 0) {
      if (commitTo == 0) {
        minCommit = commitFrom;
        maxCommit = commitFrom;
      }
      else if (commitFrom > commitTo) {
        minCommit = commitTo;
        maxCommit = commitFrom;
      }
      else {
        minCommit = commitFrom;
        maxCommit = commitTo;
      }
    }

    let newSelectedProjects = [...selectedProjects, {
      project: project,
      commitFrom: minCommit,
      commitTo: maxCommit,
      branchDomain: branchDomain,
      branch: branch,
      withFeature: withFeature
    }];

    UpdateSelectedProject(newSelectedProjects);
  }

  function hendleDelete(index) {
    let newSelectedProjects = selectedProjects.filter((v, i) => i !== index);

    UpdateSelectedProject(newSelectedProjects);
  }

  function hendleCheckbox() {
    setWithFeature(!withFeature);
  }

  function UpdateSelectedProject(newSelectedProjects) {
    
    setSelectedProject(newSelectedProjects);
    
    CalculateOpenComment(newSelectedProjects);
  }


  function CalculateOpenComment(selectedProject) {
    let newArray = [...initOpenComment];
    selectedProject.forEach(item => {
      for (let index = item.commitFrom; index <= item.commitTo; index++) {
        newArray[index - 1] = true;
      }
    });

    setOpenComment(newArray);
  }

  return <div>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="select_project">專案名稱</InputLabel >
          <Select name="select_project" id="select_project" value={project.name ?? ""} onChange={handleProjectChange}>
            {
              projectlist.map((item, index) => {
                return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField type="number" id="text_comment_from" label="備註起始" className="text_field" InputProps={{ inputProps: { min: 0, max: 9 } }} value={commitFrom} onChange={(e) => setCommitFrom(e.target.value)} fullWidth />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField type="number" id="text_comment_to" label="備註結束" className="text_field" InputProps={{ inputProps: { min: 0, max: 9 } }} value={commitTo} onChange={(e) => setCommitTo(e.target.value)} fullWidth />
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <FormControlLabel
            label="With feature"
            control={
              <Checkbox checked={withFeature} onChange={hendleCheckbox} />
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="select_branch_domain">Branch Domain</InputLabel>
          <Select name="select_branch_domain" id="select_branch_domain" value={branchDomain} onChange={(e) => setbranchDomain(e.target.value)}>
            {
              branchList.map(item => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>;
              })
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField type="text" id="text_branch" label="Branch" value={branch} onChange={(e) => setbranch(e.target.value)} fullWidth />
      </Grid>
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth>
          <Button id="button_add" variant="contained"  color="primary" onClick={handleProjectAdd} fullWidth>Add</Button>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ProjectResult projects={selectedProjects} hendleDelete={hendleDelete} openComment={openComment}></ProjectResult>
      </Grid>
    </Grid>
  </div>
};

export default Program;
