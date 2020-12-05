import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getContent } from './redux/actions/index.js'

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import AppPanel from './components/AppPanel/AppPanel.jsx';
import birdSpinner from  './images/birdspinner.gif'
import contentService from './services/contentService';
import './App.less';

//import TestHarness from './services/testHarness.js';
//TestHarness.test();

//import ReactGA from 'react-ga';
//ReactGA.initialize('UA-40530649-1');
//ReactGA.pageview(window.location.pathname + window.location.search);

const App = ({getContentItems, isDataLoaded}) => {

    contentService.initialize()
            .then(() => { 
                getContentItems()
            })
            .catch((err) => { 
                alert(err);
            });

    return (
        <div className="appdiv">
            <Header />
                {isDataLoaded?<AppPanel />:<div>Retrieving data... <img height="40" src={birdSpinner}  /></div>}
            <Footer />
        </div>);
}

const mapStateToProps = appState => ({
    isDataLoaded: appState.content.isDataLoaded
  })

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        getContentItems: getContent,
    }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)