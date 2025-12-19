// chargepe-sync.js
// This script connects index.html bookings to dashboard.html via localStorage
// Adds: Manual booking sync + Automatic random booking every 30 seconds

(function () {
    // Wait for essential data to be available (stations, plans, etc.)
    function waitForData(callback) {
        if (typeof stations !== 'undefined' && Array.isArray(stations) &&
            typeof plans !== 'undefined' && Array.isArray(plans) &&
            stations.length > 0 && plans.length > 0) {
            callback();
        } else {
            setTimeout(() => waitForData(callback), 500);
        }
    }

    waitForData(() => {
        console.log("ChargePe Sync: Data ready, initializing sync...");

        // Standardize and sync a booking to dashboard format
        function syncBookingToDashboard(booking) {
            const station = stations.find(s => s.id === booking.stationId || s.name === booking.station);
            if (!station) return;

            const plan = plans.find(p => p.name === booking.plan);
            if (!plan) return;

            // Simulate realistic values for dashboard
            const customers = Math.floor(Math.random() * 8) + 1; // 1–8 customers
            const amount = Math.round(plan.price * customers * (0.9 + Math.random() * 0.2)); // slight variation
            const duration = plan.duration || Math.floor(Math.random() * 90) + 30;

            const dashboardBooking = {
                station: station.name,
                customers: customers,
                amount: amount,
                duration: duration,
                time: new Date().toISOString(),
                status: 'Success'
            };

            // Load existing bookings
            let bookings = JSON.parse(localStorage.getItem('evBookings') || '[]');

            // Add new one at the beginning
            bookings.unshift(dashboardBooking);

            // Limit to last 20,000 entries to prevent bloat
            if (bookings.length > 20000) bookings = bookings.slice(0, 20000);

            localStorage.setItem('evBookings', JSON.stringify(bookings));

            console.log(`Synced booking: ${station.name} (${customers} customers, ₹${amount})`);
        }

        // Hook into existing addBooking function if it exists
        if (typeof addBooking === 'function') {
            const originalAddBooking = addBooking;
            window.addBooking = function (booking) {
                originalAddBooking(booking); // Keep original behavior
                syncBookingToDashboard(booking); // Also sync to dashboard
            };
            console.log("ChargePe Sync: Hooked into addBooking()");
        } else {
            // Fallback: expose a global sync function
            window.syncBookingToDashboard = syncBookingToDashboard;
        }

        // Automatic booking every 30 seconds
        setInterval(() => {
            if (!stations || stations.length === 0) return;

            const randomStation = stations[Math.floor(Math.random() * stations.length)];
            const randomPlan = plans[Math.floor(Math.random() * plans.length)];

            const autoBooking = {
                stationId: randomStation.id,
                plan: randomPlan.name,
                vehicle: "Random EV", // not used in dashboard
                time: new Date().toISOString()
            };

            // Use hooked addBooking if available, otherwise direct sync
            if (typeof addBooking === 'function') {
                addBooking(autoBooking);
            } else {
                syncBookingToDashboard(autoBooking);
            }

            console.log(`Auto-booked: ${randomStation.name} (${randomPlan.name} plan)`);
        }, 30000);

        console.log("ChargePe Sync: Auto-booking started (every 30 seconds)");
    });
})();