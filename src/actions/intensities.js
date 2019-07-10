import { loadPracticeByDateAsync } from './practices'
import { loadScoreByDateAsync } from './scores'

export const loadIntensitiesByDayAsync = (day) => {
    loadScoreByDateAsync(day);
    return loadPracticeByDateAsync(day);    
}