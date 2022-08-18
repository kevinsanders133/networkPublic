import React, { memo } from 'react';

interface BulletProps {
    isActive: boolean;
}

const Bullet: React.FC<BulletProps> = memo(({ isActive }) => {
    return (
        <div
            className="profile-publication-dialog__content-slider-bullet"
            style={{backgroundColor: (isActive ? "#03d7fc" : "#fff")}}
        ></div>
    );
});

export default Bullet;