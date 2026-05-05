"use client";

import React from "react";

const data = [
  {
    date: "2026-05-05",
    location: "ดอนเมือง",
    rf1: "ปกติ",
    rf2: "ปกติ",
    rf3: "ปกติ",
    jammer: "ขัดข้อง",
    radar: "ปกติ",
    pantilt: "ปกติ",
    adsb: "ปกติ",
    ups: "ปกติ",
    issue: "Power Module Fault",
    solution: "รอเปลี่ยนอะไหล่",
    note: "เร่งด่วน",
  },
  {
    date: "2026-05-05",
    location: "บน.1",
    rf1: "ปกติ",
    rf2: "รอตรวจสอบ",
    rf3: "ปกติ",
    jammer: "ปกติ",
    radar: "รอตรวจสอบ",
    pantilt: "ปกติ",
    adsb: "ปกติ",
    ups: "ปกติ",
    issue: "Radar signal unstable",
    solution: "กำลังตรวจสอบ",
    note: "-",
  },
];

function statusColor(status: string) {
  if (status === "ปกติ") return "#16a34a";
  if (status === "ขัดข้อง") return "#dc2626";
  if (status === "รอตรวจสอบ") return "#ca8a04";
  return "#64748b";
}

function badge(status: string) {
  return (
    <span
      style={{
        background: statusColor(status),
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
}

export default function PremiumDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(90deg,#0f172a,#334155)",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ fontSize: "42px", margin: 0 }}>
            Perimaster Enterprise Premium Dashboard
          </h1>
          <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
            ระบบติดตามสถานภาพอุปกรณ์ Perimaster รายวันระดับองค์กร
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            ["จำนวนหน่วย", data.length],
            ["ขัดข้อง", 1],
            ["รอตรวจสอบ", 1],
            ["วันที่ล่าสุด", data[0].date],
          ].map(([title, value], idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <p style={{ color: "#64748b", margin: 0 }}>{title}</p>
              <h2 style={{ fontSize: "32px", marginTop: "10px" }}>{value}</h2>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            รายงานสถานภาพประจำวัน
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1400px",
              }}
            >
              <thead>
                <tr style={{ background: "#1e293b", color: "white" }}>
                  {[
                    "วันที่",
                    "หน่วย",
                    "RF1",
                    "RF2",
                    "RF3",
                    "Jammer",
                    "Radar",
                    "PanTilt",
                    "ADS-B",
                    "UPS",
                    "ปัญหา",
                    "การแก้ไข",
                    "หมายเหตุ",
                  ].map((head) => (
                    <th
                      key={head}
                      style={{ padding: "14px", textAlign: "left" }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      background: idx % 2 === 0 ? "#f8fafc" : "white",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{row.date}</td>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>
                      {row.location}
                    </td>
                    <td style={{ padding: "12px" }}>{badge(row.rf1)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.rf2)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.rf3)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.jammer)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.radar)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.pantilt)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.adsb)}</td>
                    <td style={{ padding: "12px" }}>{badge(row.ups)}</td>
                    <td style={{ padding: "12px" }}>{row.issue}</td>
                    <td style={{ padding: "12px" }}>{row.solution}</td>
                    <td style={{ padding: "12px" }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: "25px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {[
            ["อัปโหลด Excel Daily", "#2563eb"],
            ["Export Excel", "#16a34a"],
            ["PDF Report", "#dc2626"],
            ["Admin Panel", "#0f172a"],
          ].map(([label, color], idx) => (
            <button
              key={idx}
              style={{
                background: color,
                color: "white",
                border: "none",
                padding: "14px 24px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
