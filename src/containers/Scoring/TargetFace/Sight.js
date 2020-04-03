import React from 'react';

const style = {
    width: 6,
    height: 6,
    border: '3px solid #000',
    background: '#CCC',
    position: 'absolute',
    left: (window.innerWidth / 2) - 6,
    top: ((window.innerHeight) / 2) - 6 + 30,
    borderRadius: '50%',
};

export const Sight = () =>  {
    return <div style={style}></div>
}

export default Sight;