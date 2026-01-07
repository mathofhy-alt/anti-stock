import React from 'react';

const AdSenseSlot = ({ id, className = '' }) => {
    return (
        <div 
            id={id} 
            className={`adsense-slot ${className}`} 
            aria-hidden="true"
        >
            {/* AdSense/Fix Slot Placeholder */}
        </div>
    );
};

export default AdSenseSlot;
