export const progressValues = {
    // Fundraising values (these control the progress bar and display)
    fundraising: {
        currentAmount: 235,    // Amount raised so far ($)
        targetAmount: 2184,     // Fundraising goal ($)
        get progressPercentage() {
            return (this.currentAmount / this.targetAmount) * 100;
        }
    },

    // Activity progress values
    activities: [
        { name: "SWIMMING", goal: 59, current: 27.93, color: "#A7C7E7" },
        { name: "WALKING", goal: 118, current: 0.0, color: "#B6D7A8" },
        { name: "BIKING", goal: 177, current: 27.6, color: "#D3D3D3" },
    ],

    totals: {
        totalDistance: 27.93,
        totalGoal: 354,
    }
}; 