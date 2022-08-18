import React from 'react';
import IPublication from '../../models/IPublication';
import Bullet from './Bullet';

interface CarouselProps {
    publication: IPublication;
    assetIndex: number;
}

const Carousel: React.FC<CarouselProps> = ({ publication, assetIndex }) => {
    return (
        <div className="profile-publication-dialog__content-slider-carousel">
        {
            publication.paths.length !== 1 &&
            publication.paths.map((_, index) => {
                return <Bullet key={index} isActive={assetIndex === index} />
            })
        }
        </div>
    );
};

export default Carousel;