import React from 'react';
import '../css/FileInput.css'; // Importa tu archivo CSS aquí

function FileInput({ label, onChange }) {
  return (
    <div className="file-input-container">
      <label className="file-input-label">
        {label}
        <input
          type="file"
          accept=".pdf"
          onChange={onChange}
          className="file-input"
        />
      </label>
    </div>
  );
}

export default FileInput;