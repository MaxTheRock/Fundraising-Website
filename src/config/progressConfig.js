const activities = [
    { name: "SWIMMING", goal: 59, current: 27.93, color: "#A7C7E7" },
    { name: "WALKING", goal: 118, current: 42.19, color: "#B6D7A8" },
    { name: "BIKING", goal: 177, current: 28.6, color: "#D3D3D3" },
];

export const progressValues = {
    // Fundraising values (these control the progress bar and display)
    fundraising: {
        currentAmount: 365,    // Amount raised so far ($)
        targetAmount: 2184,    // Fundraising goal ($)
        get progressPercentage() {
            return (this.currentAmount / this.targetAmount) * 100;
        }
    },

    activities,

    totals: {
        totalDistance: activities.reduce((sum, activity) => sum + activity.current, 0),
        totalGoal: 354,
    }
};
