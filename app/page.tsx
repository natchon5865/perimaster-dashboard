"use client";

import React, { useMemo, useState } from "react";

const dailyData = [
  {
    date: "2026-05-05",
    location: "ดอนเมือง",
    rf1: "ปกติ",
    rf2: "ปกติ",
    rf3: "ปกติ",
    jammer: "ขัดข้อง",
    radar: "ปกติ",
    panTilt: "ปกติ",
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
    panTilt: "ปกติ",
    adsb: "ปกติ",
    ups: "ปกติ",
    issue: "Radar signal unstable",
    solution: "กำลังตรวจสอบ",
    note: "-",
  },
];

const statusStyle: Record<string, string> = {
  "ปกติ": "bg-green-100 text-green-700",
  "ขัดข้อง": "bg-red-100 text-red-700",
  "รอตรวจสอบ": "bg-yellow-100 text-yellow-700",
  "ซ่อมแล้ว": "bg-blue-100 text-blue-700",
  "-": "bg-slate-100 text-slate-500",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle[status] || statusStyle["-"]}`}>
      {status}
    </span>
  );
}

export default function EnterpriseDashboard() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return dailyData.filter(
      (item) =>
        item.location.includes(search) ||
        item.issue.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const summary = {
    totalSites: dailyData.length,
    faulty: dailyData.filter((d) =>
      [d.rf1, d.rf2, d.rf3, d.jammer, d.radar, d.panTilt, d.adsb, d.ups].includes("ขัดข้อง")
    ).length,
    warning: dailyData.filter((d) =>
      [d.rf1, d.rf2, d.rf3, d.jammer, d.radar, d.panTilt, d.adsb, d.ups].includes("รอตรวจสอบ")
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-3xl font-bold">Perimaster Enterprise Daily Monitoring Dashboard</h1>
          <p className="text-slate-500 mt-2">ระบบติดตามสถานภาพอุปกรณ์ Perimaster รายวันระดับองค์กร</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <SummaryCard title="จำนวนหน่วย" value={summary.totalSites} />
          <SummaryCard title="ขัดข้อง" value={summary.faulty} />
          <SummaryCard title="รอตรวจสอบ" value={summary.warning} />
          <SummaryCard title="วันที่ล่าสุด" value={dailyData[0].date} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold">รายงานสถานภาพประจำวัน</h2>
            <input
              className="border rounded-xl px-4 py-2"
              placeholder="ค้นหาหน่วย / ปัญหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
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
                    <th key={head} className="p-3 border text-left whitespace-nowrap">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={idx} className="border-t hover:bg-slate-50">
                    <td className="p-3">{row.date}</td>
                    <td className="p-3 font-medium">{row.location}</td>
                    <td className="p-3"><StatusBadge status={row.rf1} /></td>
                    <td className="p-3"><StatusBadge status={row.rf2} /></td>
                    <td className="p-3"><StatusBadge status={row.rf3} /></td>
                    <td className="p-3"><StatusBadge status={row.jammer} /></td>
                    <td className="p-3"><StatusBadge status={row.radar} /></td>
                    <td className="p-3"><StatusBadge status={row.panTilt} /></td>
                    <td className="p-3"><StatusBadge status={row.adsb} /></td>
                    <td className="p-3"><StatusBadge status={row.ups} /></td>
                    <td className="p-3">{row.issue}</td>
                    <td className="p-3">{row.solution}</td>
                    <td className="p-3">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">อัปโหลด Excel Daily</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl">Export Excel</button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl">PDF Report</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">Admin Panel</button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p className="text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
