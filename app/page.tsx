"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function AdvancedPerimasterDashboard() {
  const [rows, setRows] = useState<any[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binary = evt.target?.result;
      const workbook = XLSX.read(binary, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      const parsed: any[] = [];

      for (let i = 0; i < raw.length; i++) {
        const row = raw[i];
        if (!row || row.length < 3) continue;

        const unit = String(row[0] || "").trim();

        if (unit.includes("ดอนเมือง") || unit.includes("บน.")) {
          parsed.push({
            unit,
            rf1: raw[i + 1]?.[2] || "-",
            rf2: raw[i + 2]?.[2] || "-",
            rf3: raw[i + 3]?.[2] || "-",
            jammer: raw[i + 4]?.[2] || "-",
            pantilt: raw[i + 5]?.[2] || "-",
            radar: raw[i + 6]?.[2] || "-",
            adsb: raw[i + 7]?.[2] || "-",
            ups: raw[i + 8]?.[2] || "-",
            issue: row[1] || "-",
            solution: row[2] || "-",
          });
        }
      }

      setRows(parsed);
    };

    reader.readAsBinaryString(file);
  };

  const badge = (status: string) => {
    let color = "#64748b";
    if (String(status).includes("ปกติ")) color = "#16a34a";
    if (String(status).includes("ขัดข้อง")) color = "#dc2626";
    if (String(status).includes("รอตรวจ")) color = "#ca8a04";

    return (
      <span
        style={{
          background: color,
          color: "white",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Perimaster Advanced Excel Dashboard
      </h1>

      <input type="file" accept=".xlsx,.xls" onChange={handleUpload} />

      {rows.length > 0 && (
        <div style={{ marginTop: "30px", overflowX: "auto", background: "white", padding: "20px", borderRadius: "14px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1500px" }}>
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
                  "UPS",
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
              {rows.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", fontWeight: "bold" }}>{r.unit}</td>
                  <td style={{ padding: "10px" }}>{badge(r.rf1)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.rf2)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.rf3)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.jammer)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.pantilt)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.radar)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.adsb)}</td>
                  <td style={{ padding: "10px" }}>{badge(r.ups)}</td>
                  <td style={{ padding: "10px" }}>{r.issue}</td>
                  <td style={{ padding: "10px" }}>{r.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
