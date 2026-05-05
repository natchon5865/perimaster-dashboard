"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function SmartPerimasterDashboard() {
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binary = evt.target?.result;
      const workbook = XLSX.read(binary, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      const units: any[] = [];
      let currentUnit = "";

      for (let i = 0; i < raw.length; i++) {
        const row = raw[i];
        if (!row || row.length === 0) continue;

        const firstCell = String(row[0] || "").trim();

        if (firstCell.includes("ดอนเมือง") || firstCell.includes("บน.")) {
          currentUnit = firstCell;
          units.push({
            unit: currentUnit,
            rf1: raw[i + 1]?.[1] || "-",
            rf2: raw[i + 2]?.[1] || "-",
            rf3: raw[i + 3]?.[1] || "-",
            jammer: raw[i + 4]?.[1] || "-",
            pantilt: raw[i + 5]?.[1] || "-",
            radar: raw[i + 6]?.[1] || "-",
            adsb: raw[i + 7]?.[1] || "-",
            issue: row[1] || "-",
            solution: row[2] || "-",
          });
        }
      }

      setParsedData(units);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Perimaster Smart Excel Dashboard
      </h1>

      <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />

      {parsedData.length > 0 && (
        <div style={{ marginTop: "30px", overflowX: "auto", background: "white", padding: "20px", borderRadius: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px" }}>
            <thead>
              <tr style={{ background: "#0f172a", color: "white" }}>
                {[
                  "หน่วย",
                  "RF1",
                  "RF2",
                  "RF3",
                  "Jammer",
                  "PanTilt",
                  "Radar",
                  "ADS-B",
                  "ปัญหา",
                  "การแก้ไข",
                ].map((head) => (
                  <th key={head} style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>{row.unit}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.rf1}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.rf2}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.rf3}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.jammer}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.pantilt}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.radar}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.adsb}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.issue}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{row.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
