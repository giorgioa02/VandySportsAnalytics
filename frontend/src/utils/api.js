// src/utils/api.js
export const fetchMensBasketballProfile = () =>
    fetch('http://localhost:3001/api/sports/mbball/team_profile').then(res => res.json());
  
  export const fetchMensBasketballStats = (year, season) =>
    fetch(`http://localhost:3001/api/sports/mbball/${year}_stats_${season}`).then(res => res.json());
  
  export const fetchMensBasketballSchedule = (year, season) =>
    fetch(`http://localhost:3001/api/sports/mbball/${year}_schedule_${season}`).then(res => res.json());
  