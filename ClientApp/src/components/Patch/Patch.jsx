import React, { PureComponent } from 'react';
import { InputAdornment, TextField, Button } from '@material-ui/core';

class Patch extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      patchId: '',
      keyword: '',
      result: [],
    };
  }

  componentWillMount = () => {
    console.log('Patch will mount');
  }

  componentDidMount = () => {
    console.log('Patch mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Patch will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Patch will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Patch did update');
  }

  componentWillUnmount = () => {
    console.log('Patch will unmount');
  }

  handleSearch = () => {
    if (this.state.patchId === "") {
      alert("請輸入Patch ID !");
      return;
    }

    let param = JSON.stringify({ patchId: `PATCH-${this.state.patchId}`, keyword: this.state.keyword });
    this.requestApi('api/patch/Search', param, (json) => { this.setState({ result: json }); });
  }

  handleSubmit = () => {
    if (window.confirm("確定要匯入至Patch單嗎?")) {
      let param = JSON.stringify({ result: this.state.result });
      this.requestApi('api/patch/Submit', param, (json) => { alert(json); });
    }
  }

  requestApi = (url, param, returnFun) => {
    fetch(url, {
      body: param,
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',
    })
      .then(response => {
        return response.json();
      }).then(json => {
        if (json !== null) {
          returnFun(json);
        }
      });
  }

  render() {
    let resultList = [];
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    if (this.state.result.length > 0) {
      this.state.result.map(element => {
        resultList.push(<li>{element}</li>);
      });
    }


    return (
      <div className="PatchWrapper">
        <TextField
          type="text"
          label="Patch"
          InputProps={{
            startAdornment: <InputAdornment position="start">PATCH-</InputAdornment>,
          }}
          value={this.state.patchId}
          onChange={(e) => this.setState({ patchId: e.target.value })}
        />
        <TextField type="text" label="Keyword" style={{ 'margin-left': '50px' }} value={this.state.keyword} onChange={(e) => this.setState({ keyword: e.target.value })} />
        <Button variant="contained" color="primary" style={{ 'margin-left': '50px' }} onClick={this.handleSearch}>Search</Button>
        <Button variant="contained" color="primary" style={{ 'margin-left': '50px' }} onClick={this.handleSubmit}>Submit</Button>
        <div style={{ 'margin-top': '50px' }}>
          <h3>Result :</h3>
          <ul>
            {resultList}
          </ul>
        </div>
      </div>
    );
  }
}

Patch.propTypes = {
  // bla: PropTypes.string,
};

Patch.defaultProps = {
  // bla: 'test',
};

export default Patch;
