import React from 'react';
// contains steven, stallone and seagal image directory
import actionHeroImages from './images/index';

const heroImageResolver = {
  _imgId: 0,
  _stalloneIndex: 0,
  _stevenIndex: 0,
  getStallone() {

    this._stalloneIndex = this._stalloneIndex < actionHeroImages.stallone.length - 1
      ? this._stalloneIndex + 1 : 0;

    return {
      id: this._generateImageId(),
      url: actionHeroImages.stallone[this._stalloneIndex]
    };

  },
  getSteven() {
    this._stevenIndex = this._stevenIndex < actionHeroImages.steven.length - 1
      ? this._stevenIndex + 1 : 0;

    return {
      id: this._generateImageId(),
      url: actionHeroImages.steven[this._stevenIndex]
    };
  },
  getChuck() {
    let randomIndex = Math.random() / actionHeroImages.chuck.length;
    let imageUrl = actionHeroImages.chuck[randomIndex];

    if (imageUrl) {
      return { id: this._generateImageId(), url: imageUrl };
    }

    console.error(new Error('Chuck is nowhere to be found!'));
    return null;
  },
  _generateImageId() {
    return ++this._imgId;
  }
};

export default class CodeChallenge extends React.Component {
  _interval;
  state = { images: [] };

  componentDidMount() {
    this._interval = setInterval(this._resolveImage, 2500);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _getRandomImagePosition = () => ({
      left: Math.round((this._appRef.clientWidth - 350) * Math.random()),
      top: Math.round((this._appRef.clientHeight - 350) * Math.random())
    });

  _resolveImage = () => {
    let { left, top } = this._getRandomImagePosition();

    try {
      let image = heroImageResolver.getChuck() || heroImageResolver.getSteven();

      this.setState({ images: [...this.state.images, { ...image, left, top }]});
    } catch (ex) {
      console.error(ex);
      this.setState({ images: [...this.state.images, { ...heroImageResolver.getStallone(), left, top }]});
    }
  };

  render() {
    let mappedImages = this.state.images.map((image) =>
      <div className="list-item" key={image.id} style={{left: image.left, top: image.top}}>
        <img src={image.url} />
      </div>);

    return (
      <div className="app" ref={ node => this._appRef = node }>
        <div className="action-hero-grid">
          { mappedImages }
          <div className="chucks-info">
            <div className="chucks-image" />
            <div className="chucks-description">
              <h1>Chuck Norris can kill two stones with one bird</h1>
              Kill the stones and get my images instead of <strong>Steven Seagal</strong> on the screen!
            </div>
          </div>
        </div>
      </div>
    )
  }
};

