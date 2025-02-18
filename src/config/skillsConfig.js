export const skillsData = {
    swimming: {
        progress: 30,
        image: null,
        description: 'Swimming progress for the triathlon',
        target: 50, // target distance in kilometers
        current: 15 // current distance achieved
    },
    cycling: {
        progress: 45,
        image: null,
        description: 'Cycling progress for the triathlon',
        target: 200, // target distance in kilometers
        current: 90 // current distance achieved
    },
    running: {
        progress: 60,
        image: null,
        description: 'Running progress for the triathlon',
        target: 100, // target distance in kilometers
        current: 60 // current distance achieved
    },
    fundraising: {
        progress: 75,
        target: 15000, // target amount in dollars
        current: 11250, // current amount raised
        description: 'Fundraising progress for the charity'
    }
};

// Configuration for each activity
export const skillsConfig = {
    swimming: {
        title: 'Swimming',
        maxProgress: 100,
        color: '#3498db', // blue
        unit: 'km',
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxImageSize: 5 * 1024 * 1024,
        maxDescriptionLength: 500
    },
    cycling: {
        title: 'Cycling',
        maxProgress: 100,
        color: '#e74c3c', // red
        unit: 'km',
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxImageSize: 5 * 1024 * 1024,
        maxDescriptionLength: 500
    },
    running: {
        title: 'Running',
        maxProgress: 100,
        color: '#2ecc71', // green
        unit: 'km',
        allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxImageSize: 5 * 1024 * 1024,
        maxDescriptionLength: 500
    },
    fundraising: {
        title: 'Fundraising',
        maxProgress: 100,
        color: '#f1c40f', // yellow
        unit: '$',
        maxDescriptionLength: 500
    }
};

// Helper function to calculate total progress
export const calculateTotalProgress = () => {
    const activities = ['swimming', 'cycling', 'running'];
    return activities.reduce((total, activity) => {
        return total + skillsData[activity].progress;
    }, 0) / activities.length;
};

// Helper function to get pie chart data
export const getPieChartData = () => {
    return ['swimming', 'cycling', 'running'].map(activity => ({
        name: skillsConfig[activity].title,
        value: skillsData[activity].current,
        color: skillsConfig[activity].color
    }));
};

// Helper function to get fundraising data
export const getFundraisingData = () => {
    const { current, target, progress } = skillsData.fundraising;
    return {
        current,
        target,
        progress,
        remaining: target - current
    };
}; 