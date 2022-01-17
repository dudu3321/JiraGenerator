import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Program from './components/Program/Program';
import SqlData from './components/SqlData/SqlData';
import ProjectPath from './components/ProjectPath/ProjectPath';
import Patch from './components/Patch/Patch'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Program} />
        <Route exact path='/Program' component={Program} />
        <Route path='/SqlData' component={SqlData} />
        <Route path='/ProjectPath' component={ProjectPath} />
        <Route path='/Patch' component={Patch} />
      </Layout>
    );
  }
}
