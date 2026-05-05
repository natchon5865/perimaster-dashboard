"use client";

import React, { useState } from "react";

export default function LiveDashboard() {
  const [rows, setRows] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("perimaster-data");
      if (saved) return JSON.parse(saved);
    }

    return [
      {
        unit: "ดอนเมือง",
        rf1: "ปกติ",
        rf2: "ปกติ",
        rf3: "ปกติ",
        jammer: "ขัดข้อง",
        radar: "ปกติ",
        pantilt: "ปติ",
        adsb: "ปกติ",
        upsc2: "ปกติ",
        ups1: "ปกติ",
        ups2: "ปกติ",
        ups3: "ปกติ",
        issue: "Power Module Fault",
        solution: "รอเปลี่ยนอะไหล่",
      },
      {
        unit: "บน.1",
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
      },
      {
        unit: "บน.4",
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
      },
      {
        unit: "บน.7",
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
      },
      {
        unit: "บน.21",
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
      },
    ];
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

  return (
    <div
      style={{
        padding: "30px",
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        Perimaster Live Monitoring Dashboard
      </h1>

      <div
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#0f172a",
        }}
      >
        อัปเดตล่าสุด: {new Date().toLocaleString("th-TH")}
      </div>

      <div
        style={{
          overflowX: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "2200px",
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
                <th key={h} style={{ padding: "12px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                {Object.keys(row).map((field) => (
                  <td key={field} style={{ padding: "10px" }}>
                    {field.includes("rf") ||
                    field === "jammer" ||
                    field === "radar" ||
                    field === "pantilt" ||
                    field === "adsb" ||
                    field === "upsc2" ||
                    field === "ups1" ||
                    field === "ups2" ||
                    field === "ups3" ? (
                      <select
                        value={(row as any)[field]}
                        onChange={(e) =>
                          updateRow(idx, field, e.target.value)
                        }
                        style={{
                          padding: "6px",
                          borderRadius: "8px",
                          background: badgeColor((row as any)[field]),
                          color: "white",
                          fontWeight: "bold",
                          minWidth: "90px",
                        }}
                      >
                        <option>ปกติ</option>
                        <option>ขัดข้อง</option>
                        <option>รอตรวจสอบ</option>
                      </select>
                    ) : (
                      <textarea
                        value={(row as any)[field]}
                        onChange={(e) =>
                          updateRow(idx, field, e.target.value)
                        }
                        rows={2}
                        style={{
                          width: "100%",
                          minWidth: "220px",
                          padding: "8px",
                          resize: "vertical",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
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
