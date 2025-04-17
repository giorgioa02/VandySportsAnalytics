// Men's Basketball
export const fetchMensBasketballProfile = () =>
    fetch('http://backend:3001/api/sports/mbball/team_profile').then(res => res.json());
  
  export const fetchMensBasketballStats = (year, season) =>
    fetch(`http://backend:3001/api/sports/mbball/${year}_stats_${season}`).then(res => res.json());
  
  export const fetchMensBasketballSchedule = (year, season) =>
    fetch(`http://backend:3001/api/sports/mbball/${year}_schedule_${season}`).then(res => res.json());
  
  export const fetchMensBasketballLastUpdated = async () => {
    const res = await fetch('http://backend:3001/api/sports/mbball/last_updated');
    const data = await res.json();
    return data.mbball;
  };
  
  // Women's Basketball
  export const fetchWomensBasketballProfile = () =>
    fetch('http://backend:3001/api/sports/wbball/team_profile').then(res => res.json());
  
  export const fetchWomensBasketballStats = (year, season) =>
    fetch(`http://backend:3001/api/sports/wbball/${year}_stats_${season}`).then(res => res.json());
  
  export const fetchWomensBasketballSchedule = (year, season) =>
    fetch(`http://backend:3001/api/sports/wbball/${year}_schedule_${season}`).then(res => res.json());
  
  export const fetchWomensBasketballLastUpdated = async () => {
    const res = await fetch('http://backend:3001/api/sports/wbball/last_updated');
    const data = await res.json();
    return data.wbball;
  };
  
  // Men's Football
  export const fetchMensFootballProfile = () =>
    fetch('http://backend:3001/api/sports/mfootball/team_profile').then(res => res.json());
  
  export const fetchMensFootballStats = (year, season) =>
    fetch(`http://backend:3001/api/sports/mfootball/${year}_stats_${season}`).then(res => res.json());
  
  export const fetchMensFootballSchedule = (year, season) =>
    fetch(`http://backend:3001/api/sports/mfootball/${year}_schedule_${season}`).then(res => res.json());
  
  export const fetchMensFootballLastUpdated = async () => {
    const res = await fetch('http://backend:3001/api/sports/mfootball/last_updated');
    const data = await res.json();
    return data.mfootball;
  };
  