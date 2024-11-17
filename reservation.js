// Initialize Lucide icons
lucide.createIcons();

// Sidebar functionality
const sidebar = document.querySelector('.sidebar');
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach((item, index) => {
    // Skip the first item (menu button)
    if (index === 0) {
        item.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
        });
        return;
    }

    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Handle navigation based on the clicked item
        const itemText = item.querySelector('span').textContent.trim();
        switch(itemText) {
            case 'Dashboard':
                window.location.href = 'index.html';
                break;
            case 'Reservation':
                window.location.href = 'reservation.html';
                break;
            // Add other cases for future pages
            default:
                console.log('Page not implemented yet');
        }
    });
});

// Function to set active nav item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const itemText = item.querySelector('span')?.textContent.trim();
        if (
            (currentPage === 'index.html' && itemText === 'Dashboard') ||
            (currentPage === 'reservation.html' && itemText === 'Reservation')
        ) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Call setActiveNavItem when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    
    // Initialize schedule grid
    initializeTimeGrid();
    
    // Initialize date controls
    initializeDateControls();
    
    // Initialize calendar
    initializeCalendar();
    initializeDoctorList();
});

function initializeTimeGrid() {
    const scheduleGrid = document.querySelector('.schedule-grid');
    if (!scheduleGrid) return;

    // Create time slots from 9 AM to 4 PM
    const timeSlots = generateTimeSlots();
    const dentists = [
        { name: "Drg Soap Mactavish", patients: "4 patient(s)" },
        { name: "Drg Cipeng", patients: "1 patient(s)" },
        { name: "Drg Putri Larasati", patients: "0 patient(s)" }
    ];

    // Create grid layout
    const gridHTML = `
        <div class="time-column">
            ${timeSlots.map(time => `<div class="time-slot">${time}</div>`).join('')}
        </div>
        ${dentists.map(dentist => `
            <div class="dentist-column" data-dentist="${dentist.name}">
                ${timeSlots.map(time => `
                    <div class="appointment-slot" data-time="${time}">
                        ${time === '2:00 PM' ? '<div class="break-time">BREAK TIME</div>' : ''}
                    </div>
                `).join('')}
            </div>
        `).join('')}
    `;

    scheduleGrid.innerHTML = gridHTML;

    // Add sample appointments
    addSampleAppointments();
}

function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        slots.push(`${displayHour}:00 ${period}`);
        slots.push(`${displayHour}:30 ${period}`);
    }
    return slots;
}

const appointments = [
    {
        dentist: "Drg Soap Mactavish",
        time: "9:00 AM",
        patient: "Medical Checkup",
        duration: 60,
        status: "Done"
    },
    {
        dentist: "Drg Cipeng",
        time: "10:30 AM",
        patient: "Operation",
        duration: 90,
        status: "Upcoming"
    },
    {
        dentist: "Drg Putri Larasati",
        time: "11:00 AM",
        patient: "Medical Checkup",
        duration: 60,
        status: "Done"
    },
    {
        dentist: "Drg Soap Mactavish",
        time: "2:30 PM",
        patient: "Medical Checkup",
        duration: 60,
        status: "Upcoming"
    },
    {
        dentist: "Drg Cipeng",
        time: "3:00 PM",
        patient: "Operation",
        duration: 90,
        status: "Upcoming"
    }
];

function addSampleAppointments() {
    appointments.forEach(appt => {
        const column = document.querySelector(`[data-dentist="${appt.dentist}"]`);
        if (!column) return;

        const slot = Array.from(column.children).find(
            slot => slot.dataset.time === appt.time
        );
        if (!slot) return;

        const appointmentEl = document.createElement('div');
        appointmentEl.className = `appointment ${appt.status.toLowerCase()}`;
        appointmentEl.style.height = `${appt.duration}px`;
        appointmentEl.innerHTML = `
            <div class="appointment-content">
                <div class="appointment-time">${appt.time}</div>
                <div class="appointment-title">${appt.patient}</div>
                <div class="appointment-status">${appt.status}</div>
            </div>
        `;

        slot.appendChild(appointmentEl);
    });
}

function initializeDateControls() {
    const currentDate = new Date();
    const dateDisplay = document.querySelector('.current-date');
    if (dateDisplay) {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
    }
}

// Handle view type changes
const viewSelect = document.querySelector('.view-select');
if (viewSelect) {
    viewSelect.addEventListener('change', (e) => {
        console.log('View changed to:', e.target.value);
    });
}

// Handle dentist selection
const dentistSelect = document.querySelector('.dentist-select');
if (dentistSelect) {
    dentistSelect.addEventListener('change', (e) => {
        console.log('Dentist changed to:', e.target.value);
    });
}

// Calendar functionality
function initializeCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;

    // Sample appointments
    const appointments = [
        { 
            time: '5:30a', 
            title: 'Click for Google', 
            type: 'google', 
            color: '#5c6bc0',
            date: '2024-11-01'
        },
        { 
            time: '5:30a', 
            title: 'All Day Event', 
            type: 'all-day', 
            color: '#4285f4',
            date: '2024-11-04'
        },
        { 
            time: '5:30a', 
            title: 'Long Event', 
            type: 'long', 
            color: '#7e57c2',
            date: '2024-11-03'
        },
        { 
            time: '5:30a', 
            title: 'Birthday Party', 
            type: 'birthday', 
            color: '#ef5350',
            date: '2024-11-14'
        },
        { 
            time: '5:30a', 
            title: 'Doctor Meeting', 
            type: 'meeting', 
            color: '#66bb6a',
            date: '2024-11-16'
        }
    ];

    // Create calendar grid
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date(2024, 10); // November 2024
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.className = 'calendar-row header';
    days.forEach(day => {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell header';
        cell.textContent = day;
        headerRow.appendChild(cell);
    });
    calendarGrid.appendChild(headerRow);

    // Create date grid
    let currentRow = document.createElement('div');
    currentRow.className = 'calendar-row';

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-cell empty';
        currentRow.appendChild(emptyCell);
    }

    // Add days of the month
    for (let date = 1; date <= lastDay.getDate(); date++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';
        
        // Add date number
        const dateNumber = document.createElement('div');
        dateNumber.className = 'date-number';
        dateNumber.textContent = date;
        cell.appendChild(dateNumber);

        // Add appointments for this date
        const dateStr = `2024-11-${String(date).padStart(2, '0')}`;
        const dayAppointments = appointments.filter(apt => apt.date === dateStr);
        
        dayAppointments.forEach(apt => {
            const appointmentEl = document.createElement('div');
            appointmentEl.className = `calendar-event ${apt.type}`;
            appointmentEl.style.backgroundColor = apt.color;
            appointmentEl.innerHTML = `
                <span class="event-time">${apt.time}</span>
                <span class="event-title">${apt.title}</span>
            `;
            cell.appendChild(appointmentEl);
        });

        currentRow.appendChild(cell);

        // Start new row after Saturday
        if ((firstDay.getDay() + date) % 7 === 0) {
            calendarGrid.appendChild(currentRow);
            currentRow = document.createElement('div');
            currentRow.className = 'calendar-row';
        }
    }

    // Add remaining empty cells
    const remainingCells = 7 - currentRow.children.length;
    for (let i = 0; i < remainingCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-cell empty';
        currentRow.appendChild(emptyCell);
    }

    // Add last row if it has any cells
    if (currentRow.children.length > 0) {
        calendarGrid.appendChild(currentRow);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalendar); 

// Sample doctor appointments data
const doctorAppointments = [
    {
        id: 1,
        name: "Dr. Emily Johnson",
        specialty: "Pediatrician",
        time: "10:00 - 11:00",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        patients: 4
    },
    {
        id: 2,
        name: "Dr. Michael Lee",
        specialty: "Dermatologist",
        time: "11:00 - 12:00",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        patients: 3
    },
    {
        id: 3,
        name: "Dr. Sarah Wilson",
        specialty: "Orthodontist",
        time: "14:00 - 15:00",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        patients: 5
    }
];

// Function to initialize doctor list
function initializeDoctorList() {
    const doctorCardsContainer = document.querySelector('.doctor-cards');
    if (!doctorCardsContainer) return;

    doctorCardsContainer.innerHTML = doctorAppointments.map(doctor => `
        <div class="doctor-card">
            <div class="doctor-avatar">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <div class="doctor-name">${doctor.name}</div>
                <div class="doctor-specialty">${doctor.specialty}</div>
            </div>
            <div class="doctor-schedule">
                <div class="schedule-time">
                    <i data-lucide="clock"></i>
                    <span>${doctor.time}</span>
                </div>
                <div class="patient-count">
                    <i data-lucide="users"></i>
                    <span>${doctor.patients} patients</span>
                </div>
            </div>
            <button class="view-schedule-btn">
                <i data-lucide="calendar"></i>
                View Schedule
            </button>
        </div>
    `).join('');

    // Reinitialize Lucide icons
    lucide.createIcons();

    // Add click handlers for view schedule buttons
    document.querySelectorAll('.view-schedule-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            alert(`Viewing schedule for ${doctorAppointments[index].name}`);
        });
    });
} 

document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentCalendar();
    initializeDoctorList();
    initializeControls();
});

// Initialize appointment calendar
function initializeAppointmentCalendar() {
    // Sample appointments data
    const appointments = [
        {
            id: 1,
            title: "Medical Checkup",
            time: "08:00 AM",
            patient: "John Smith",
            type: "checkup",
            color: "#dcfce7",
            borderColor: "#16a34a"
        },
        {
            id: 2,
            title: "Heart Check-Up",
            time: "09:00 AM",
            patient: "Sarah Johnson",
            type: "heart",
            color: "#e0f2fe",
            borderColor: "#0284c7"
        },
        {
            id: 3,
            title: "Physical Control",
            time: "09:00 AM",
            patient: "Mike Brown",
            type: "physical",
            color: "#fef3c7",
            borderColor: "#d97706"
        },
        {
            id: 4,
            title: "Check-Up Kid",
            time: "12:00 PM",
            patient: "Emily Davis",
            type: "checkup",
            color: "#dcfce7",
            borderColor: "#16a34a"
        }
    ];

    // Add appointments to calendar
    appointments.forEach(appt => addAppointmentToCalendar(appt));
}

// Add appointment to calendar
function addAppointmentToCalendar(appointment) {
    const calendarSection = document.querySelector('.calendar-section');
    if (!calendarSection) return;

    const appointmentEl = document.createElement('div');
    appointmentEl.className = `appointment ${appointment.type}`;
    appointmentEl.style.backgroundColor = appointment.color;
    appointmentEl.style.borderLeftColor = appointment.borderColor;
    
    appointmentEl.innerHTML = `
        <div class="appointment-time">${appointment.time}</div>
        <div class="appointment-title">${appointment.title}</div>
        <div class="appointment-patient">${appointment.patient}</div>
    `;

    // Add click handler for appointment details
    appointmentEl.addEventListener('click', () => {
        showAppointmentDetails(appointment);
    });

    calendarSection.appendChild(appointmentEl);
}

// Show appointment details
function showAppointmentDetails(appointment) {
    // You can implement a modal or tooltip here
    console.log('Appointment details:', appointment);
}

// Initialize doctor list
function initializeDoctorList() {
    const doctors = [
        {
            id: 1,
            name: "Dr. Emily Johnson",
            specialty: "Pediatrician",
            time: "10:00 - 11:00",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            patients: 4
        },
        {
            id: 2,
            name: "Dr. Michael Lee",
            specialty: "Dermatologist",
            time: "11:00 - 12:00",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
            patients: 3
        },
        {
            id: 3,
            name: "Dr. Sarah Wilson",
            specialty: "Orthodontist",
            time: "14:00 - 15:00",
            image: "https://randomuser.me/api/portraits/women/3.jpg",
            patients: 5
        }
    ];

    const doctorList = document.querySelector('.doctor-cards');
    if (!doctorList) return;

    doctors.forEach(doctor => {
        const doctorCard = createDoctorCard(doctor);
        doctorList.appendChild(doctorCard);
    });
}

// Create doctor card
function createDoctorCard(doctor) {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    
    card.innerHTML = `
        <div class="doctor-avatar">
            <img src="${doctor.image}" alt="${doctor.name}">
        </div>
        <div class="doctor-info">
            <div class="doctor-name">${doctor.name}</div>
            <div class="doctor-specialty">${doctor.specialty}</div>
        </div>
        <div class="doctor-schedule">
            <div class="schedule-time">
                <i data-lucide="clock"></i>
                <span>${doctor.time}</span>
            </div>
            <div class="patient-count">
                <i data-lucide="users"></i>
                <span>${doctor.patients} patients</span>
            </div>
        </div>
        <button class="view-schedule-btn" onclick="viewDoctorSchedule(${doctor.id})">
            <i data-lucide="calendar"></i>
            View Schedule
        </button>
    `;

    return card;
}

// Initialize controls
function initializeControls() {
    // Filter button
    const filterBtn = document.querySelector('button[title="Filter"]');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            console.log('Filter clicked');
            // Implement filter functionality
        });
    }

    // Monthly button
    const monthlyBtn = document.querySelector('button[title="Monthly"]');
    if (monthlyBtn) {
        monthlyBtn.addEventListener('click', () => {
            console.log('Monthly view clicked');
            // Implement monthly view
        });
    }

    // Download Data button
    const downloadBtn = document.querySelector('button[title="Download Data"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            console.log('Download clicked');
            // Implement download functionality
        });
    }

    // Check new button
    const checkNewBtn = document.querySelector('.check-new-btn');
    if (checkNewBtn) {
        checkNewBtn.addEventListener('click', () => {
            console.log('New appointment');
            // Implement new appointment functionality
        });
    }
}

// View doctor schedule
function viewDoctorSchedule(doctorId) {
    console.log(`Viewing schedule for doctor ${doctorId}`);
    // Implement view schedule functionality
}

// Reinitialize Lucide icons after dynamic content
function updateIcons() {
    lucide.createIcons();
} 