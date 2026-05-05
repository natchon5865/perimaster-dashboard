"use client";

import React, { useState, useEffect } from "react";

export default function LiveDashboard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("th-TH", {
          dateStyle: "short",
          timeStyle: "medium",
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const defaultRows = [
    {
      unit: "ดอนเมือง",
      rf1: "ปกติ",
      rf2: "ปกติ",
      rf3: "ปกติ",
      jammer: "ขัดข้อง",
      radar: "ปกติ",
      pantilt: "ปกติ",
      adsb: "ปกติ",
      upsc2: "ปกติ",
      ups1: "ปกติ",
      ups2: "ปกติ",
      ups3: "ปกติ",
      issue: "Power Module Fault",
      solution: "รอเปลี่ยนอะไหล่",
    },
    ...["บน.1", "บน.4", "บน.7", "บน.21"].map((unit) => ({
      unit,
      rf1: "ปกติ",
      rf2: "ปกติ",
      rf3: "ปกติ",
      jammer: "ปกติ",
      radar: "ปกติ",
      pantilt: "ปกติ",
      adsb: "ปกติ",
      upsc2: "ปกติ",
      ups1: "ปกติ",
      ups2: "ปกติ",
      ups3: "ปกติ",
      issue: "",
      solution: "",
    })),
  ];

  const [rows, setRows] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("perimaster-data");
      if (saved) return JSON.parse(saved);
    }
    return defaultRows;
  });

  const updateRow = (index: number, field: string, value: string) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
    localStorage.setItem("perimaster-data", JSON.stringify(updated));
  };

  const badgeColor = (status: string) => {
    if (status === "ปกติ") return "#16a34a";
    if (status === "ขัดข้อง") return "#dc2626";
    if (status === "รอตรวจสอบ") return "#ca8a04";
    return "#64748b";
  };

  const statusFields = [
    "rf1",
    "rf2",
    "rf3",
    "jammer",
    "radar",
    "pantilt",
    "adsb",
    "upsc2",
    "ups1",
    "ups2",
    "ups3",
  ];

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px",
          color: "#0f172a",
        }}
      >
        Perimaster Live Monitoring Dashboard
      </h1>

      <div
        style={{
          marginBottom: "25px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#0f172a",
        }}
      >
        อัปเดตล่าสุด: {currentTime}
      </div>

      <div
        style={{
          overflowX: "hidden",
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
                          textAlign: field === "unit" ? "left" : "center",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ background: "#0f172a", color: "white" }}>
              {[
                "หน่วย",
                "RF1",
                "RF2",
                "RF3",
                "Jammer",
                "Radar",
                "PanTilt",
                "ADS-B",
                "UPS C2",
                "UPS 1",
                "UPS 2",
                "UPS 3",
                "ปัญหา",
                "การแก้ไข",
              ].map((h) => (
                <th key={h} style={{ padding: "8px", fontSize: "15px", textAlign: "center" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                {Object.keys(row).map((field) => (
                  <td key={field} style={{ padding: "6px", fontSize: "15px", textAlign: "center" }}>
                    {field === "unit" ? (
                      <input
                        value={(row as any)[field]}
                        onChange={(e) => updateRow(idx, field, e.target.value)}
                        style={{
                          width: "100%",
                          textAlign: field === "unit" ? "left" : "center",
                          minWidth: "60px",
                          padding: "6px
                          fontSize: "15px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                    ) : statusFields.includes(field) ? (
                      <select
                        value={(row as any)[field]}
                        onChange={(e) => updateRow(idx, field, e.target.value)}
                        style={{
                          padding: "6px
                          borderRadius: "8px",
                          background: badgeColor((row as any)[field]),
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "15px",
                          minWidth: "80px",
                        }}
                      >
                        <option>ปกติ</option>
                        <option>ขัดข้อง</option>
                        <option>รอตรวจสอบ</option>
                      </select>
                    ) : (
                      <textarea
                        value={(row as any)[field]}
                        onChange={(e) => updateRow(idx, field, e.target.value)}
                        rows={2}
                        style={{
                          width: "100%",
                          textAlign: field === "unit" ? "left" : "center",
                          minWidth: "260px",
                          padding: "6px
                          resize: "vertical",
                          wordBreak: "break-word",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          fontSize: "15px",
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
