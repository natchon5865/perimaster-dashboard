"use client";

export default function Dashboard() {
  return (
    <main style={{ padding: "24px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Perimaster Daily Monitoring Dashboard
      </h1>
      <p>ระบบติดตามสถานภาพอุปกรณ์ประจำวัน</p>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          background: "white"
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th>วันที่</th>
            <th>หน่วย</th>
            <th>อุปกรณ์</th>
            <th>สถานะ</th>
            <th>ปัญหา</th>
            <th>การแก้ไข</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026-05-05</td>
            <td>ดอนเมือง</td>
            <td>RF Sensor 1</td>
            <td>ปกติ</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>2026-05-05</td>
            <td>ดอนเมือง</td>
            <td>Jammer</td>
            <td>ขัดข้อง</td>
            <td>Power Module Fault</td>
            <td>รอเปลี่ยนอะไหล่</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
