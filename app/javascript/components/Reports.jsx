import React, { useState } from "react";
import axios from "axios";

const Reports = () => {
  const [selectedFormat, setSelectedFormat] = useState("xlsx"); // Default format

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const exportUsersData = async () => {
    try {
      const response = await axios.get(`/users/export_users_data?format=${selectedFormat}`, {
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

  return (
    <div className="Reports">
      <h2>Reports</h2>
      <div>
        <label>
          <input
            type="radio"
            value="xlsx"
            checked={selectedFormat === "xlsx"}
            onChange={handleFormatChange}
          />
          XLSX
        </label>
        <label>
          <input
            type="radio"
            value="csv"
            checked={selectedFormat === "csv"}
            onChange={handleFormatChange}
          />
          CSV
        </label>
        <button onClick={exportUsersData}>Export Users Data</button>
      </div>
      {/* Add your other reports content here */}
    </div>
  );
};

export default Reports;
