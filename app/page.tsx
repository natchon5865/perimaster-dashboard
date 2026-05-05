"use client";

import React, { useEffect, useState } from "react";

type Status = "ปกติ" | "รอตรวจสอบ" | "ขัดข้อง";

interface UnitRow {
  unit: string;
  rf1: Status;
  rf2: Status;
  rf3: Status;
  jammer: Status;
  radar: Status;
  pantilt: Status;
  adsb: Status;
  upsc2: Status;
  ups1: Status;
  ups2: Status;
  ups3: Status;
  issue: string;
  solution: string;
}

const defaultRows: UnitRow[] = [
  {
    unit: "ดอนเมือง",
    rf1: "ปกติ",
    rf2: "ปกติ",
    rf3: "ปกติ",
    jammer: "ขัดข้อง",
    radar: "ปกติ",
    pantilt: "รอตรวจสอบ",
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

export default function Page() {
  const [rows, setRows] = useState<UnitRow[]>(defaultRows);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("perimaster-dashboard");
    if (saved) {
      setRows(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("perimaster-dashboard", JSON.stringify(rows));
  }, [rows]);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleString("th-TH"));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateRow = (
    index: number,
    field: keyof UnitRow,
    value: UnitRow[keyof UnitRow]
  ) => {
    const updated = [...rows];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setRows(updated);
  };

  const getStatusStyle = (status: Status) => ({
    background:
      status === "ปกติ"
        ? "#16a34a"
        : status === "รอตรวจสอบ"
        ? "#d97706"
        : "#dc2626",
    color: "white",
    minWidth: "132px",
    maxWidth: "132px",
    height: "46px",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "6px 10px",
    textAlign: "center" as const,
    borderRadius: "10px",
    whiteSpace: "nowrap" as const,
    border: "none",
    outline: "none",
    cursor: "pointer",
  });

  const textAreaStyle = {
    width: "48%",
    minWidth: "340px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  };

  const statusFields: (keyof UnitRow)[] = [
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

  const headers = [
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
  ];

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Perimaster Live Monitoring Dashboard
      </h1>

      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        อัปเดตล่าสุด: {currentTime}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "18px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "auto",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#0f172a",
                color: "white",
              }}
            >
              {headers.map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "10px 6px",
                    fontSize: "15px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td
                  style={{
                    padding: "8px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.unit}
                </td>

                {statusFields.map((field) => (
                  <td
                    key={field}
                    style={{
                      padding: "6px 3px",
                      textAlign: "center",
                    }}
                  >
                    <select
                      value={row[field]}
                      onChange={(e) =>
                        updateRow(
                          idx,
                          field,
                          e.target.value as Status
                        )
                      }
                      style={getStatusStyle(row[field] as Status)}
                    >
                      <option value="ปกติ">ปกติ</option>
                      <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                      <option value="ขัดข้อง">ขัดข้อง</option>
                    </select>
                  </td>
                ))}

                <td colSpan={2} style={{ padding: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      width: "100%",
                    }}
                  >
                    <textarea
                      value={row.issue}
                      onChange={(e) =>
                        updateRow(
                          idx,
                          "issue",
                          e.target.value
                        )
                      }
                      rows={2}
                      placeholder="ปัญหา"
                      style={textAreaStyle}
                    />

                    <textarea
                      value={row.solution}
                      onChange={(e) =>
                        updateRow(
                          idx,
                          "solution",
                          e.target.value
                        )
                      }
                      rows={2}
                      placeholder="การแก้ไข"
                      style={textAreaStyle}
                    />
                  </div>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
          
