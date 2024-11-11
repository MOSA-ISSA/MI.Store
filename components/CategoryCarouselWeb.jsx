import "./CategoryCarouselWeb.css";
import React, { useRef } from "react";

const CategoryCarouselWeb = ({ renderCategories, items }) => {
    const rowRef = useRef(null);
    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDragging = true;
        rowRef.current.classList.add("no-select"); // Add the no-select class with grabbing cursor
        startX = e.pageX - rowRef.current.offsetLeft;
        scrollLeft = rowRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging = false;
        rowRef.current.classList.remove("no-select"); // Remove the no-select class
    };

    const handleMouseUp = () => {
        isDragging = false;
        rowRef.current.classList.remove("no-select"); // Remove the no-select class
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default behavior to avoid text selection
        const x = e.pageX - rowRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed by modifying multiplier
        rowRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={rowRef}
            className="scrollable-row"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {renderCategories?.()}
        </div>
    );
};

export default CategoryCarouselWeb;
