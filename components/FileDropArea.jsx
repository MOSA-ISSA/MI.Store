import React, { useState } from 'react';

function FileDropArea() {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true); // show feedback
    };

    const handleDragLeave = () => {
        setIsDragging(false); // hide feedback
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        // Grab the first file only
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        console.log("File Dropped: ", droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("File Selected: ", selectedFile);
    };

    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: isDragging ? '2px dashed #3498db' : '2px dashed #ccc',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    color: isDragging ? '#3498db' : '#333',
                    transition: 'border-color 0.3s',
                }}
            >
                {file ? (
                    <p>Selected File: {file.name}</p>
                ) : (
                    <p>Drag & drop a file here, or <span style={{ color: '#3498db', textDecoration: 'underline' }}>click to select</span></p>
                )}
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    ref={(input) => input && (input.style.display = 'none')}
                />
            </div>
        </div>
    );
}

export default FileDropArea;
