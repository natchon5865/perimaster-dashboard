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

const statusColor: Record<string, string> = {
  "ปกติ": "bg-green-100 text-green-700",
  "ขัดข้อง": "bg-red-100 text-red-700",
  "รอตรวจสอบ": "bg-yellow-100 text-yellow-700",
  "ซ่อมแล้ว": "bg-blue-100 text-blue-700",
};

function Badge({ status }: { status: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status] || "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
      <p className="text-slate-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default function PremiumDashboard() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return dailyData.filter(
      (d) =>
        d.location.toLowerCase().includes(search.toLowerCase()) ||
        d.issue.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-3xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold">Perimaster Enterprise Premium Dashboard</h1>
          <p className="mt-3 text-slate-200 text-lg">
            ระบบติดตามสถานภาพอุปกรณ์ Perimaster รายวันระดับองค์กร
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <StatCard title="จำนวนหน่วย" value={dailyData.length} />
          <StatCard title="ขัดข้อง" value={dailyData.filter((d) => d.jammer === "ขัดข้อง").length} />
          <StatCard title="รอตรวจสอบ" value={dailyData.filter((d) => d.radar === "รอตรวจสอบ" || d.rf2 === "รอตรวจสอบ").length} />
          <StatCard title="วันที่ล่าสุด" value={dailyData[0].date} />
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">รายงานสถานภาพประจำวัน</h2>
            <input
              className="border border-slate-300 rounded-2xl px-4 py-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ค้นหาหน่วย / ปัญหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
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
                    <th key={head} className="p-4 whitespace-nowrap">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={idx} className="border-t hover:bg-slate-50">
                    <td className="p-3">{row.date}</td>
                    <td className="p-3 font-semibold">{row.location}</td>
                    <td className="p-3"><Badge status={row.rf1} /></td>
                    <td className="p-3"><Badge status={row.rf2} /></td>
                    <td className="p-3"><Badge status={row.rf3} /></td>
                    <td className="p-3"><Badge status={row.jammer} /></td>
                    <td className="p-3"><Badge status={row.radar} /></td>
                    <td className="p-3"><Badge status={row.panTilt} /></td>
                    <td className="p-3"><Badge status={row.adsb} /></td>
                    <td className="p-3"><Badge status={row.ups} /></td>
                    <td className="p-3">{row.issue}</td>
                    <td className="p-3">{row.solution}</td>
                    <td className="p-3">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold">
              อัปโหลด Excel Daily
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-semibold">
              Export Excel
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-semibold">
              PDF Report
            </button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-2xl font-semibold">
              Admin Panel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
