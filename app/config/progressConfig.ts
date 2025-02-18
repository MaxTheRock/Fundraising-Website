type ProgressConfig = {
    fundraising: {
        currentAmount: number;
        targetAmount: number;
        progressPercentage: number;
    };
    activities: {
        name: string;
        goal: number;
        current: number;
        color: string;
    }[];
    totals: {
        totalDistance: number;
        totalGoal: number;
    };
};

export const progressValues: ProgressConfig = {
    fundraising: {
        currentAmount: 2750,
        targetAmount: 5000,
        get progressPercentage() {
            return (this.currentAmount / this.targetAmount) * 100;
        }
    },
    activities: [
        { name: "SWIMMING", goal: 100, current: 4.2, color: "#A7C7E7" },
        { name: "WALKING", goal: 100, current: 67.5, color: "#B6D7A8" },
        { name: "BIKING", goal: 200, current: 145.8, color: "#D3D3D3" },
    ],
    totals: {
        totalDistance: 10,
        totalGoal: 120
    }
}; 