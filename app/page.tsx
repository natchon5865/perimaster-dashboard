"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelDashboard() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Perimaster Excel Auto Dashboard
      </h1>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />

      {data.length > 0 && (
        <div style={{ overflowX: "auto", background: "white", padding: "20px", borderRadius: "12px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      background: "#1e293b",
                      color: "white",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val: any, i) => (
                    <td
                      key={i}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
