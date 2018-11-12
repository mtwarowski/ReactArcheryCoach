import { loadPracticeByDateAsync } from './practices'
import { loadScoreByDateAsync } from './scores'

export const loadIntensitiesByDayAsync = (day) => {
    return Promise.resolve(Promise.all([loadPracticeByDateAsync(day), loadScoreByDateAsync(day)]).then((values) => {
        return {practices: values[0].val(), scores: values[1].val(), day: day};
    }));
}