import { useState } from 'react';
import { skillsData, skillsConfig } from '../config/skillsConfig';
import './YourComponent.css';

const YourComponent = () => {
    const [skills, setSkills] = useState(skillsData);

    const handleProgressUpdate = (skill, newValue) => {
        setSkills(prev => ({
            ...prev,
            [skill]: { 
                ...prev[skill], 
                progress: parseInt(newValue) 
            }
        }));
    };

    const handleImageUpload = (event, skill) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type and size
        if (!skillsConfig[skill].allowedImageTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a valid image.');
            return;
        }

        if (file.size > skillsConfig[skill].maxImageSize) {
            alert('File is too large. Maximum size is 5MB.');
            return;
        }

        // Create URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);
        setSkills(prev => ({
            ...prev,
            [skill]: { 
                ...prev[skill], 
                image: imageUrl 
            }
        }));
    };

    const handleDescriptionUpdate = (skill, description) => {
        if (description.length > skillsConfig[skill].maxDescriptionLength) {
            alert(`Description cannot exceed ${skillsConfig[skill].maxDescriptionLength} characters`);
            return;
        }

        setSkills(prev => ({
            ...prev,
            [skill]: { 
                ...prev[skill], 
                description 
            }
        }));
    };

    return (
        <div className="skills-container">
            {Object.entries(skills).map(([skill, data]) => (
                <div key={skill} className="skill-card">
                    <h2>{skillsConfig[skill].title}</h2>
                    
                    <div className="progress-section">
                        <input 
                            type="range" 
                            value={data.progress} 
                            onChange={(e) => handleProgressUpdate(skill, e.target.value)}
                            min="0"
                            max={skillsConfig[skill].maxProgress}
                        />
                        <span>{data.progress}%</span>
                    </div>

                    <div className="image-section">
                        <input 
                            type="file" 
                            accept={skillsConfig[skill].allowedImageTypes.join(',')}
                            onChange={(e) => handleImageUpload(e, skill)}
                        />
                        {data.image && (
                            <img 
                                src={data.image} 
                                alt={`${skill} preview`} 
                                className="skill-image"
                            />
                        )}
                    </div>

                    <div className="description-section">
                        <textarea
                            value={data.description}
                            onChange={(e) => handleDescriptionUpdate(skill, e.target.value)}
                            placeholder={`Enter ${skill} description...`}
                            maxLength={skillsConfig[skill].maxDescriptionLength}
                            rows="4"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default YourComponent; 