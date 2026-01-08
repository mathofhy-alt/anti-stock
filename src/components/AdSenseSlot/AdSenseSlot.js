'use client';

import React, { useEffect } from 'react';

const AdSenseSlot = ({ id, slot = "8985671234", className = '', style = {} }) => {
    useEffect(() => {
        try {
            // Push the ad to the queue
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense Push Error:', e);
        }
    }, [id]); // Re-run if ID changes

    return (
        <div
            id={id}
            className={`adsense-slot ${className}`}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0', ...style }}
        >
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', textAlign: 'center' }}
                data-ad-client="ca-pub-9155561960636914"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSenseSlot;
