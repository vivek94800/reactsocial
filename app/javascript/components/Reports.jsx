import React, { useState } from "react";
import axios from "axios";
//import "./Reports.css"; // Import your custom CSS file

const Reports = ({ onSectionChange }) => {
  const [selectedFormat, setSelectedFormat] = useState("xlsx"); // Default format
  const [selectedFformat, setSelectedFformat] = useState("xlsx"); // Default format

  const [includeUsersWith10Posts, setIncludeUsersWith10Posts] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/users/upload_users_data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };



  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };
  
  const handleFformatChange = (event) => {
    setSelectedFformat(event.target.value);
  };
  const handleIncludeUsersChange = (event) => {
    setIncludeUsersWith10Posts(event.target.checked);
  };

  const exportUsersData = async () => {
    try {
      const response = await axios.get(`/users/export_users_data?format=${selectedFormat}&include_users_with_10_posts=${includeUsersWith10Posts}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `users_data.${selectedFormat}`;
      link.click();
    } catch (error) {
      console.error('Error exporting users data:', error);
    }
  };


  const exportPostsData = async () => {
    try {
      const response = await axios.get(`/posts/export_posts_data?format=${selectedFformat}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `posts_data.${selectedFformat}`;
      link.click();
    } catch (error) {
      console.error('Error exporting posts data:', error);
    }
  };



  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>
      <div className="reports-options">
        <label className="reports-option">
          <input
            type="radio"
            value="xlsx"
            checked={selectedFormat === "xlsx"}
            onChange={handleFormatChange}
          />
          XLSX
        </label>
        <label className="reports-option">
          <input
            type="radio"
            value="csv"
            checked={selectedFormat === "csv"}
            onChange={handleFormatChange}
          />
          CSV
        </label>
        <label className="reports-option">
          <input
            type="checkbox"
            checked={includeUsersWith10Posts}
            onChange={handleIncludeUsersChange}
          />
          Include users with more than 10 posts
        </label>
        <button className="reports-exportButton" onClick={exportUsersData}>
          Export Users Data
        </button>
      </div>
      {/* post*/}
      

      <div className="reports-options">
        <label className="reports-option">
          <input
            type="radio"
            value="xlsx"
            checked={selectedFformat === "xlsx"}
            onChange={handleFformatChange}
          />
          XLSX
        </label>
        <label className="reports-option">
          <input
            type="radio"
            value="csv"
            checked={selectedFformat === "csv"}
            onChange={handleFformatChange}
          />
          CSV
        </label>
        <button className="reports-exportButton" onClick={exportPostsData}>
          Export Posts Data
        </button>
      </div>
      <div className="reports-options">
        <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
        <button className="reports-exportButton" onClick={handleFileUpload}>
          Upload Users Data
        </button>
      </div>
    </div>
  );
};

export default Reports;
