// Array of background colors to cycle through
const colors = [
    '#f5f5f5', // default
    '#e0f7fa', // light blue
    '#f3e5f5', // light purple
    '#e8f5e9', // light green
    '#fff8e1', // light yellow
    '#fbe9e7'  // light red
];

// Current color index
let currentColorIndex = 0;

// Get button element
const colorButton = document.getElementById('colorButton');

// Add click event listener
colorButton.addEventListener('click', function() {
    // Move to next color (or back to beginning if at the end)
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    
    // Apply the new color
    document.body.style.backgroundColor = colors[currentColorIndex];
});

// Auto Marker Planning Software - Main Application Logic

// Data structures
let markers = [];
let assignmentPlan = [];
let projectDetails = {
    name: '',
    deadline: null
};

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Add event listeners
    document.getElementById('addMarkerBtn').addEventListener('click', addMarker);
    document.getElementById('assignBtn').addEventListener('click', assignPapers);
    
    // Set today as the minimum date for the deadline
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('projectDeadline').setAttribute('min', today);
    
    // Save project details when inputs change
    document.getElementById('projectName').addEventListener('change', updateProjectDetails);
    document.getElementById('projectDeadline').addEventListener('change', updateProjectDetails);
});

// Update project details
function updateProjectDetails() {
    projectDetails.name = document.getElementById('projectName').value;
    projectDetails.deadline = document.getElementById('projectDeadline').value;
    
    // You could save this to local storage or send to backend here
    console.log('Project details updated:', projectDetails);
}

// Add a new marker
function addMarker() {
    const markerName = document.getElementById('markerName').value.trim();
    const markerExpertise = document.getElementById('markerExpertise').value;
    const markingCapacity = parseInt(document.getElementById('markingCapacity').value);
    
    // Validate inputs
    if (!markerName) {
        alert('Please enter a marker name');
        return;
    }
    
    if (!markerExpertise) {
        alert('Please select an expertise');
        return;
    }
    
    if (isNaN(markingCapacity) || markingCapacity <= 0) {
        alert('Please enter a valid marking capacity');
        return;
    }
    
    // Create marker object
    const marker = {
        id: Date.now().toString(), // Simple unique ID
        name: markerName,
        expertise: markerExpertise,
        capacity: markingCapacity,
        assignedPapers: 0
    };
    
    // Add to markers array
    markers.push(marker);
    
    // Clear input fields
    document.getElementById('markerName').value = '';
    document.getElementById('markerExpertise').selectedIndex = 0;
    document.getElementById('markingCapacity').value = '';
    
    // Update UI
    renderMarkers();
    
    console.log('Marker added:', marker);
}

// Render markers list
function renderMarkers() {
    const markersList = document.getElementById('markersList');
    
    // Clear current content
    markersList.innerHTML = '';
    
    if (markers.length === 0) {
        markersList.innerHTML = '<div class="empty-state">No markers added yet. Add markers from the sidebar.</div>';
        return;
    }
    
    // Add each marker to the UI
    markers.forEach(marker => {
        const expertiseText = getExpertiseText(marker.expertise);
        
        const markerCard = document.createElement('div');
        markerCard.className = 'marker-card';
        markerCard.innerHTML = `
            <div class="marker-info">
                <h4>${marker.name}</h4>
                <p>Expertise: ${expertiseText}</p>
                <p>Capacity: ${marker.capacity} papers per day</p>
                <p class="assigned ${marker.assignedPapers > 0 ? 'highlight' : ''}">
                    ${marker.assignedPapers > 0 ? `Assigned: ${marker.assignedPapers} papers` : 'Not assigned yet'}
                </p>
            </div>
            <div class="marker-actions">
                <button class="delete-btn" data-id="${marker.id}">Remove</button>
            </div>
        `;
        
        markersList.appendChild(markerCard);
        
        // Add delete event listener
        const deleteBtn = markerCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteMarker(marker.id));
    });
}

// Helper function to get readable expertise name
function getExpertiseText(expertise) {
    const expertiseMap = {
        'math': 'Mathematics',
        'science': 'Science',
        'english': 'English',
        'history': 'History',
        'programming': 'Programming'
    };
    
    return expertiseMap[expertise] || expertise;
}

// Delete a marker
function deleteMarker(id) {
    // Filter out the marker to be deleted
    markers = markers.filter(marker => marker.id !== id);
    
    // Update UI
    renderMarkers();
    
    // If we've already created an assignment plan, update it
    if (assignmentPlan.length > 0) {
        assignPapers();
    }
}

// Assign papers to markers
function assignPapers() {
    const totalPapers = parseInt(document.getElementById('totalPapers').value);
    const assignmentStrategy = document.getElementById('assignmentStrategy').value;
    
    // Validate inputs
    if (isNaN(totalPapers) || totalPapers <= 0) {
        alert('Please enter a valid number of papers');
        return;
    }
    
    if (markers.length === 0) {
        alert('Please add at least one marker before assigning papers');
        return;
    }
    
    // Reset previously assigned papers
    markers.forEach(marker => marker.assignedPapers = 0);
    
    // Apply selected assignment strategy
    switch (assignmentStrategy) {
        case 'even':
            assignEvenly(totalPapers);
            break;
        case 'capacity':
            assignByCapacity(totalPapers);
            break;
        case 'expertise':
            assignByExpertise(totalPapers);
            break;
        default:
            assignEvenly(totalPapers);
    }
    
    // Update UI
    renderMarkers();
    renderAssignmentPlan(totalPapers);
}

// Assignment strategies
function assignEvenly(totalPapers) {
    const perMarker = Math.floor(totalPapers / markers.length);
    let remaining = totalPapers - (perMarker * markers.length);
    
    markers.forEach(marker => {
        marker.assignedPapers = perMarker;
        
        // Distribute remaining papers one by one
        if (remaining > 0) {
            marker.assignedPapers++;
            remaining--;
        }
    });
}

function assignByCapacity(totalPapers) {
    // Calculate total capacity
    const totalCapacity = markers.reduce((sum, marker) => sum + marker.capacity, 0);
    
    // Distribute papers proportionally
    let remainingPapers = totalPapers;
    
    markers.forEach(marker => {
        const proportion = marker.capacity / totalCapacity;
        let assigned = Math.floor(totalPapers * proportion);
        
        // Make sure we don't assign more than what's left
        assigned = Math.min(assigned, remainingPapers);
        
        marker.assignedPapers = assigned;
        remainingPapers -= assigned;
    });
    
    // Distribute any remaining papers to markers with the highest capacity
    if (remainingPapers > 0) {
        const sortedByCapacity = [...markers].sort((a, b) => b.capacity - a.capacity);
        
        for (let i = 0; i < sortedByCapacity.length && remainingPapers > 0; i++) {
            const marker = markers.find(m => m.id === sortedByCapacity[i].id);
            marker.assignedPapers++;
            remainingPapers--;
        }
    }
}

function assignByExpertise(totalPapers) {
    // This is a placeholder for a more complex expertise-based assignment
    // In a real application, you would likely have subject-specific papers
    
    // For now, let's just call the capacity-based assignment as a fallback
    assignByCapacity(totalPapers);
}

// Render the assignment plan
function renderAssignmentPlan(totalPapers) {
    const assignmentPlanElement = document.getElementById('assignmentPlan');
    
    // Clear previous plan
    assignmentPlanElement.innerHTML = '';
    
    if (markers.length === 0 || markers.every(marker => marker.assignedPapers === 0)) {
        assignmentPlanElement.innerHTML = '<div class="empty-state">Generate an assignment plan by adding markers and clicking "Assign Papers".</div>';
        return;
    }
    
    // Create summary
    const summary = document.createElement('div');
    summary.className = 'plan-summary';
    
    const deadlineText = projectDetails.deadline ? 
        `by ${new Date(projectDetails.deadline).toLocaleDateString()}` : 
        '';
    
    const projectNameText = projectDetails.name ? 
        `for "${projectDetails.name}"` : 
        '';
    
    summary.innerHTML = `
        <p>Total of <strong>${totalPapers}</strong> papers to be marked ${projectNameText} ${deadlineText}</p>
        <p>Assigned to <strong>${markers.length}</strong> markers</p>
    `;
    
    assignmentPlanElement.appendChild(summary);
    
    // Create plan items for each marker
    markers.forEach(marker => {
        const planItem = document.createElement('div');
        planItem.className = 'plan-item';
        
        const percentAssigned = (marker.assignedPapers / totalPapers * 100).toFixed(1);
        const daysNeeded = Math.ceil(marker.assignedPapers / marker.capacity);
        
        planItem.innerHTML = `
            <h4>${marker.name}</h4>
            <p>Assigned: <strong>${marker.assignedPapers}</strong> papers (${percentAssigned}% of total)</p>
            <p>Daily capacity: <strong>${marker.capacity}</strong> papers per day</p>
            <p>Estimated completion time: <strong>${daysNeeded}</strong> day${daysNeeded !== 1 ? 's' : ''}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentAssigned}%"></div>
            </div>
        `;
        
        assignmentPlanElement.appendChild(planItem);
    });
    
    // Store the plan (could be sent to backend)
    createAssignmentPlanObject(totalPapers);
}

// Create a structured assignment plan object (for backend integration)
function createAssignmentPlanObject(totalPapers) {
    const deadline = projectDetails.deadline ? new Date(projectDetails.deadline) : null;
    
    assignmentPlan = {
        project: {
            name: projectDetails.name || 'Unnamed Project',
            deadline: deadline,
            totalPapers: totalPapers
        },
        assignments: markers.map(marker => ({
            markerId: marker.id,
            markerName: marker.name,
            expertise: marker.expertise,
            assignedPapers: marker.assignedPapers,
            capacity: marker.capacity,
            estimatedDays: Math.ceil(marker.assignedPapers / marker.capacity)
        }))
    };
    
    console.log('Assignment plan created:', assignmentPlan);
    return assignmentPlan;
}