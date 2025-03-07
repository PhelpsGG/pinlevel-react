import React from 'react';
import '../styles/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faExclamationCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // Sample data for pinball machines
  const machines = [
    {
      name: 'Medieval Madness',
      percentage: 85,
      pitch: { value: 6.8, target: 6.5, status: 'warning' },
      roll: { value: 0.8, target: 0.0, status: 'error' },
      stabilityScore: 85,
      scoreColor: 'blue',
      insights: [
        { text: 'Front-right leg showing increased movement', icon: 'arrow-right' },
        { text: 'Right-front leg too high', icon: 'warning', level: 'warning' }
      ]
    },
    {
      name: 'Attack from Mars',
      percentage: 92,
      pitch: { value: 7.2, target: 6.5, status: 'error' },
      roll: { value: 0.1, target: 0.0, status: 'success' },
      stabilityScore: 65,
      scoreColor: 'orange',
      insights: [
        { text: 'Consistent forward tilt developing', icon: 'arrow-right' },
        { text: 'Front legs too low', icon: 'warning', level: 'warning' }
      ]
    },
    {
      name: 'Monster Bash',
      percentage: 45,
      pitch: { value: 6.4, target: 6.5, status: 'success' },
      roll: { value: 0.9, target: 0.0, status: 'error' },
      stabilityScore: 35,
      scoreColor: 'red',
      insights: [
        { text: 'Back-left leg showing severe instability', icon: 'arrow-right' },
        { text: 'Loose left-back leg', icon: 'error', level: 'error' }
      ]
    },
    {
      name: 'The Addams Family',
      percentage: 78,
      pitch: { value: 5.8, target: 6.5, status: 'error' },
      roll: { value: 0.2, target: 0.0, status: 'warning' },
      stabilityScore: 75,
      scoreColor: 'blue',
      insights: [
        { text: 'Gradual backward tilt developing', icon: 'arrow-right' },
        { text: 'Back legs too low', icon: 'warning', level: 'warning' }
      ]
    },
    {
      name: 'Indiana Jones',
      percentage: 65,
      pitch: { value: 6.6, target: 6.5, status: 'success' },
      roll: { value: -0.7, target: 0.0, status: 'error' },
      stabilityScore: 95,
      scoreColor: 'green',
      insights: [
        { text: 'Stability improved after recent adjustments', icon: 'arrow-up' },
        { text: 'Machine may need floor reinforcement', icon: 'warning', level: 'warning' }
      ]
    },
    {
      name: 'Twilight Zone',
      percentage: 88,
      pitch: { value: 6.5, target: 6.5, status: 'success' },
      roll: { value: 0.1, target: 0.0, status: 'success' },
      stabilityScore: 55,
      scoreColor: 'orange',
      insights: [
        { text: 'Uneven floor surface detected', icon: 'arrow-right' },
        { text: 'Daily temperature cycles affecting level', icon: 'warning', level: 'warning' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FontAwesomeIcon icon={faCheck} className="status-icon success" />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon warning" />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationCircle} className="status-icon error" />;
      default:
        return null;
    }
  };

  const getScoreColorClass = (color) => {
    return `score score-${color}`;
  };

  const getInsightIcon = (icon, level) => {
    switch (icon) {
      case 'arrow-right':
        return <FontAwesomeIcon icon={faArrowRight} className={`insight-icon ${level || ''}`} />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} className={`insight-icon ${level || ''}`} />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationCircle} className={`insight-icon ${level || ''}`} />;
      case 'arrow-up':
        return <FontAwesomeIcon icon={faArrowRight} className={`insight-icon rotated ${level || ''}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">PinLevel Dashboard</h1>
      
      <div className="machine-grid">
        {machines.map((machine, index) => (
          <div className={`machine-card ${machine.percentage < 50 ? 'critical' : ''}`} key={index}>
            <div className="machine-header">
              <h2 className="machine-name">{machine.name}</h2>
              <div className={`percentage-badge ${machine.percentage < 50 ? 'critical' : machine.percentage < 75 ? 'warning' : 'good'}`}>
                {machine.percentage}%
              </div>
            </div>
            
            <div className="measurement">
              <div className="measurement-label">Pitch</div>
              <div className="measurement-value">
                {machine.pitch.value}° <span className="target-value">(Target: {machine.pitch.target}°)</span>
                {getStatusIcon(machine.pitch.status)}
              </div>
            </div>
            
            <div className="measurement">
              <div className="measurement-label">Roll</div>
              <div className="measurement-value">
                {machine.roll.value}° <span className="target-value">(Target: {machine.roll.target}°)</span>
                {getStatusIcon(machine.roll.status)}
              </div>
            </div>
            
            <div className="stability-section">
              <div className="stability-header">Stability Score</div>
              <div className={getScoreColorClass(machine.scoreColor)}>{machine.stabilityScore}</div>
              <div className={`progress-bar progress-${machine.scoreColor}`}>
                <div className="progress-fill" style={{ width: `${machine.stabilityScore}%` }}></div>
              </div>
            </div>
            
            <div className="insights-section">
              {machine.insights.map((insight, i) => (
                <div className={`insight-item ${insight.level || ''}`} key={i}>
                  {getInsightIcon(insight.icon, insight.level)}
                  <span className="insight-text">{insight.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 