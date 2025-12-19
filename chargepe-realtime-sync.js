// chargepe-realtime-sync.js
// Advanced Real-Time Sync between index.html (User App) and dashboard.html (Admin)
// Features:
// - Instant sync when booking happens in index.html
// - Automatic random bookings every 30 seconds
// - Cross-tab real-time updates (no refresh needed in dashboard)
// - Clean, non-intrusive hook — only add this file to index.html

(function () {
    'use strict';

    // Wait for critical globals to be available
    function waitForGlobals(callback) {
        if (
            typeof stations !== 'undefined' && Array.isArray(stations) && stations.length > 0 &&
            typeof plans !== 'undefined' && Array.isArray(plans) && plans.length > 0 &&
            typeof addBooking === 'function'
        ) {
            callback();
        } else {
            setTimeout(() => waitForGlobals(callback), 300);
        }
    }

    waitForGlobals(() => {
        console.log("ChargePe Real-Time Sync: Initialized");

        const STORAGE_KEY = 'evBookings';

        // Enhanced standardized booking for dashboard
        function createDashboardBooking(userBooking) {
            const station = stations.find(s => 
                s.id === userBooking.stationId || 
                s.name === userBooking.station
            );
            if (!station) return null;

            const plan = plans.find(p => p.name === userBooking.plan) || plans[0];

            const customers = Math.floor(Math.random() * 10) + 1; // 1–10
            const basePrice = plan.price || 1800;
            const amount = Math.round(basePrice * customers * (0.85 + Math.random() * 0.3));
            const duration = plan.duration || Math.floor(Math.random() * 90) + 40;

            return {
                station: station.name,
                customers: customers,
                amount: amount,
                duration: duration,
                time: new Date().toISOString(),
                status: 'Success'
            };
        }

        // Sync to localStorage and trigger storage event
        function syncToDashboard(booking) {
            const dashBooking = createDashboardBooking(booking);
            if (!dashBooking) return;

            let bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            bookings.unshift(dashBooking);
            bookings = bookings.slice(0, 25000); // Prevent infinite growth

            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

            // Trigger storage event for other tabs (dashboard)
            window.dispatchEvent(new StorageEvent('storage', {
                key: STORAGE_KEY,
                newValue: JSON.stringify(bookings),
                storageArea: localStorage
            }));

            console.log(`Real-time sync: ${dashBooking.station} booked (₹${dashBooking.amount})`);
        }

        // Hook into existing addBooking
        const originalAddBooking = addBooking;
        window.addBooking = function (booking) {
            originalAddBooking(booking);     // Original behavior (UI, list, etc.)
            syncToDashboard(booking);        // Real-time sync to dashboard
        };

        // Automatic random booking every 30 seconds
        setInterval(() => {
            const randomStation = stations[Math.floor(Math.random() * stations.length)];
            const randomPlan = plans[Math.floor(Math.random() * plans.length)];

            const autoBooking = {
                stationId: randomStation.id,
                plan: randomPlan.name,
                vehicle: "Auto EV",
                time: new Date().toISOString()
            };

            addBooking(autoBooking); // Triggers both UI + real-time sync
            console.log(`Auto booking: ${randomStation.name}`);
        }, 30000);

        console.log("ChargePe Real-Time Sync: Active (30s auto-book + instant sync)");
    });

})();