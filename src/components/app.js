import _ from 'lodash';
import React,  {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { videoSearch, videoSelect } from '../actions/index';

import SearchBar from './search_bar';
import VideoList from './video_list';
import VideoDetail from './video_detail';



export default class App extends Component{
  constructor(props){
    super(props);



    this.props.videoSearch('surfboards');

  }

  renderVideoDetail(){
    console.log("selected video from render", this.props.selectedVideo);
    if (this.props.selectedVideo === undefined || this.props.selectedVideo === null){
      return;
    } else {
      console.log(this.props.selectedVideo)
      return <VideoDetail video = {this.props.selectedVideo}/>;
    }

  }

  render(){
    console.log("props",this.props)
    // prevents search from running immediately after each letter  - basically allows some typing before firing
    const videoSearch = _.debounce((term) => { this.props.videoSearch(term); }, 500);

    return (
      <div>
        <div className  = "header">
          <h1 className ="display-3">YouTube Search</h1>
        </div>
        <SearchBar onSearchTermChange={videoSearch} />
        {this.renderVideoDetail()}
        <VideoList
          onVideoSelect= {this.props.videoSelect}
          videos = {this.props.videos}
        />
      </div>
    );
  }
}


function mapStateToProps({ videos, selectedVideo }) {
  return { videos, selectedVideo };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({videoSearch, videoSelect}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
