export const sortByValue = (points) => points.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    if (a.displayValue < b.displayValue) return 1;
    if (a.displayValue > b.displayValue) return -1;
    return 0;
});


export const getMaxTournamentRoundScore = (tournamentRound) => {
    let totalValue = 0;

    for (let index = 0; index < tournamentRound.rounds.length; index++) {
        const round = tournamentRound.rounds[index];
        let maxScoringFiledValue = 0;

        round.targetFace.targets.forEach((target) => {
            const newMaxScoringFiledValue = Math.max(...target.map(o => o.value));
            if (newMaxScoringFiledValue > maxScoringFiledValue)
                maxScoringFiledValue = newMaxScoringFiledValue;
        });

        totalValue += maxScoringFiledValue * round.arrowsPairEnd * round.numberOfEnds;
    }

    return totalValue;
}

export const getCurrentTournamentRoundScore = (results) => {
    if (!results instanceof Array) {
        return 0;
    }

    let sumScore = 0;

    results && results.forEach((rs) => {
        rs && rs.forEach((s) => {
            s && s.forEach((p) => {
                if (p) {
                    sumScore += p.value;
                }
            });
        });
    });

    return sumScore;
}