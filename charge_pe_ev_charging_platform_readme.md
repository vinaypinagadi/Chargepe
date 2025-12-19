# ⚡ ChargePe — Smart EV Charging Platform

A **modern, frontend-only EV charging ecosystem** that combines a **real-time user app** with a **live admin analytics dashboard**. Built to simulate how a production-grade EV network behaves — bookings, charging, analytics, invoices, maps, and sync — all without a backend.

---

## 🌍 What is ChargePe?

ChargePe is an **interactive EV charging experience** designed for demos, portfolios, and academic projects. It visualizes how users find stations, reserve slots, charge vehicles, and how admins monitor revenue, sessions, traffic, and performance — all in real time.

> 🚀 *Think of it as a complete EV startup frontend — map, bookings, analytics, and dashboards included.*

---

## 🧭 Project Architecture

```
User App (index.html)
   ├── Live Map (Leaflet)
   ├── Station Discovery
   ├── Booking & Charging Simulator
   ├── AR Overlay
   ├── Invoice Generator
   └── Local Storage (Bookings)
            ↓ Real-Time Sync
Admin Dashboard (dashboard.html)
   ├── Live KPIs
   ├── Charts & Analytics
   ├── Traffic Sources
   ├── Activity Logs
   └── CSV / PDF Export
```

🔄 **Real-time sync** is handled entirely via `localStorage` + cross-tab events.

---

## ✨ Key Features (Visualized)

### 🚗 User App — EV Charging Experience

- 🗺️ **Live Interactive Map** (Leaflet)
- 📍 Auto-generated EV stations (50–350 kW)
- 🔍 Location search + nearby station detection
- ⚡ Station status: Available / Charging / Reserved
- 🧾 **Slot Reservation & Booking Flow**
- 🔋 **Charging Simulator** (battery %, kWh, power rate)
- 📄 **PDF Invoice Generation** (jsPDF)
- 📦 Export / Import bookings (JSON)
- 🧠 Smart ETA & distance calculation
- 🌓 Dark / Light theme toggle
- 📱 Fully responsive (mobile → 4K)
- 🛰️ **AR Overlay mode** (visual demo layer)
- 📴 Offline-first behavior (PWA-ready)

> 🎮 *Feels like a real charging session — but runs fully in the browser.*

---

### 📊 Admin Dashboard — Real-Time Analytics

- 📈 **Live KPI Cards**
  - Sessions ⚡
  - Revenue 💰 (₹)
  - Customers 👥

- 📊 Interactive Charts (Chart.js)
  - Reports (Today / Month / Year)
  - EV Charging Trends
  - Traffic Sources

- 🕒 Date Filters
  - Today
  - Week
  - Month
  - Quarterly
  - Yearly

- 🧾 **Recent Bookings Table**
- 🔔 Live booking popup notifications
- 🗂️ Activity logs
- 📤 Export Reports
  - CSV (PapaParse)
  - PDF (jsPDF + AutoTable)
- 🌓 Dark / Light mode

> 📡 *Open dashboard + user app in two tabs and watch data update instantly.*

---

## 🔄 Real-Time Sync Engine

### Files Involved

- `chargepe-sync.js`
- `chargepe-realtime-sync.js`

### What It Does

- ⚡ Hooks into `addBooking()` automatically
- 🔁 Syncs bookings from **User App → Admin Dashboard**
- 🕒 Auto-generates demo bookings every 30 seconds
- 🧠 Normalizes data (customers, revenue, duration)
- 🧯 Prevents storage overflow (20k–25k cap)
- 🧵 Works across tabs — **no refresh needed**

> 🔥 *No backend. No sockets. Still feels live.*

---

## 🧩 Tech Stack

| Layer | Technology |
|-----|-----------|
| UI | HTML5, CSS3, Glassmorphism |
| Maps | Leaflet.js, Routing Machine |
| Charts | Chart.js |
| Storage | localStorage |
| Sync | Storage Events |
| Export | jsPDF, AutoTable, PapaParse |
| Animations | Lottie |
| Icons | Font Awesome |

---

## 📂 Project Structure

```
📦 ChargePe
 ┣ 📄 index.html              # User EV App
 ┣ 📄 dashboard.html          # Admin Dashboard
 ┣ 📄 style.css               # High-end responsive system
 ┣ 📄 chargepe-sync.js        # Booking sync (basic)
 ┣ 📄 chargepe-realtime-sync.js # Advanced real-time sync
```

---

## 🚀 How to Run

1. Clone or download the project
2. Open `index.html` in browser
3. Open `dashboard.html` in another tab
4. Make a booking or wait 30 seconds
5. Watch analytics update instantly 📊

✅ No server
✅ No database
✅ No setup

---

## 🎓 Use Cases

- 💼 Portfolio / Resume project
- 🎓 Academic demonstrations
- 🧪 UI / UX experimentation
- ⚡ EV startup concept demo
- 📊 Analytics dashboard showcase

---

## 🔮 Future Enhancements (Ideas)

- 🔐 Auth & role-based access
- ☁️ Backend (Firebase / Supabase)
- 📡 WebSocket real-time sync
- 🧠 AI-based demand prediction
- 🏙️ City-wise heatmaps

---

## 🧑‍💻 Author

Built with ⚡ and ❤️ by **Vinay**

> *ChargePe shows how far frontend engineering alone can go.*

---

### ⭐ If you like this project, give it a star and plug in! 🔌