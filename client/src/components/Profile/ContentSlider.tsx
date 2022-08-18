import React, { useState, useEffect, useMemo } from 'react';
import IPublication from '../../models/IPublication';
import Carousel from './Carousel';

interface ContentSliderProps {
  publication: IPublication;
}

const ContentSlider: React.FC<ContentSliderProps> = ({ publication }) => {

  const [assetIndex, setAssetIndex] = useState<number>(0);

  useEffect(() => {
    setAssetIndex(0);
  }, [publication.id]);

  const conditionForLeftItems = useMemo(() => {
    return assetIndex > 0
  },
    [assetIndex]
  );

  const conditionForRightItems = useMemo(() => {
    return publication && publication.paths.length - assetIndex > 1
  },
    [publication, assetIndex]
  );

  const slideToLeft = () => {
    if (conditionForLeftItems) {
      setAssetIndex(prev => prev - 1);
    }
  }

  const slideToRight = () => {
    if (conditionForRightItems) {
      setAssetIndex(prev => prev + 1);
    }
  }

  return (
    <div
      className="profile-publication-dialog__content-slider"
      style={
        publication
        ? {backgroundImage: `url(http://localhost:5001/users/${publication.paths[assetIndex]})`}
        : {}
      }
    >
      <div
        className="profile-publication-dialog__content-slider-left"
        onClick={slideToLeft}
        style={{
          visibility: 
          conditionForLeftItems ? "visible" : "hidden"
        }}
      ><svg aria-label="Next" className="profile-publication-dialog__content-slider-left-arrow" color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg></div>
      <Carousel publication={publication} assetIndex={assetIndex} />
      <div
        className="profile-publication-dialog__content-slider-right"
        onClick={slideToRight}
        style={{
          visibility: 
          conditionForRightItems ? "visible" : "hidden"
        }}
      ><svg aria-label="Next" className="profile-publication-dialog__content-slider-right-arrow" color="#000000" fill="#000000" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg></div>
      {/* {
        conditionForLeftItems
        && <div className="profile-publication-dialog__content-slider-left-asset"></div>
      }
      <div className="profile-publication-dialog__content-slider-middle-asset"></div>
      {
        conditionForRightItems
        && <div className="profile-publication-dialog__content-slider-right-asset"></div>
      } */}
    </div>
  );
};

export default ContentSlider;