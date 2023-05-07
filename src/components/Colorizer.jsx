const { useState } = require('react');

const Colorizer = () => {
    const [color, setColor] = useState('white');

    const colors = ['red', 'green', 'blue', 'purple'];

    return (
        <div style={{ backgroundColor: color }}>
            {colors.map((color) => (
                <button onClick={() => setColor(color)}>{color}</button>
            ))}
        </div>
    );
};

export default Colorizer;
