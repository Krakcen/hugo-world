import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setGalleryState } from '../../redux/actions.js';
import FlickrHugo from './flickrSteps.js';
import './Gallery.css';

class Gallery extends React.Component {
    componentDidMount() {
        let glob = this;
        let galleryState = {};
        if (this.props.galleryState !== null)
            galleryState = this.props.galleryState;
        else {
            galleryState.page = 1;
            axios.get(FlickrHugo.findUserURL("MiniKraken"))
                .then(function (response) {
                    galleryState["user"] = {
                        id: response.data.user.id,
                        name: response.data.user.username._content,
                    };
                    axios.get(FlickrHugo.findCollectionTreeURL(galleryState.user.id))
                        .then(function (response) {
                            galleryState["collections"] = [];
                            for (let i = 0; i < response.data.collections.collection.length; i++) {
                                let getAlbums = () => {
                                    let albumList = [];
                                    for (let k = 0; k < response.data.collections.collection[i].set.length; k++) {
                                        albumList.push({
                                            id: response.data.collections.collection[i].set[k].id,
                                            title: response.data.collections.collection[i].set[k].title,
                                            photoList: [],
                                        });
                                    }
                                    return (albumList);
                                };
                                galleryState["collections"].push({
                                    title: response.data.collections.collection[i].title,
                                    albums: getAlbums(),
                                    id: response.data.collections.collection[i].id,
                                });
                            }
                            glob.props.updateGallery(galleryState);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <div className="main-content hugo-gallery">
                <h1>{ this.props.galleryState ? "LOADED" : "LOADING" }</h1>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        galleryState: state.galleryState,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        updateGallery: (galleryState) => { dispatch(setGalleryState(galleryState)); },
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);