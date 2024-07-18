import React, { useState, useRef, useEffect } from 'react'; // Ensure you have a CSS file for styling

const Grab = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const elementRect = elementRef.current.getBoundingClientRect();
        setOffset({ x: e.clientX - elementRect.left, y: e.clientY - elementRect.top });
    };

    const handleMouseMove = (e) => {
        console.log("hello")
        if (isDragging) {
            setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        }
    };

    const handleMouseUp = () => {
        console.log("hello")
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseout', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);

        } else {
            document.addEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseout', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);

        }
        return () => {
            document.addEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseout', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);

        };
    }, [isDragging]);

    return (
        <div
            ref={elementRef}
            className="grab-element"
            onMouseDown={handleMouseDown}
            style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'absolute' }}
        >
            {children}
        </div>
    );
};

export default Grab;
