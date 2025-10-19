"use strict";
class Serie {
    constructor(id, name, channel, seasons, description, webPage, poster) {
        this.id = id;
        this.name = name;
        this.channel = channel;
        this.seasons = seasons;
        this.description = description;
        this.webPage = webPage;
        this.poster = poster;
    }
}
const series = [
    new Serie(1, "Breaking Bad", "AMC", 5, "Set and filmed in Albuquerque, New Mexico, the series tells the story of Walter White, a struggling and depressed high school chemistry teacher who is diagnosed with lung cancer", "https://www.amc.com/shows/breaking-bad", "https://i.imgur.com/GGje0vc.jpg"),
    new Serie(2, "Orange Is the New Black", "Netflix", 6, "The series begins revolving around Piper Chapman, a woman in her thirties living in New York City who is sentenced to 15 months in Litchfield Penitentiary", "https://www.netflix.com/co/title/70242311", "https://i.imgur.com/EvKe48G.jpg"),
    new Serie(3, "Game of Thrones", "HBO", 7, "American fantasy drama", "https://www.hbo.com/game-of-thrones", "https://i.imgur.com/TDCEV1S.jpg"),
    new Serie(4, "The Big Bang Theory", "CBS", 12, "Leonard and Sheldon are brilliant physicists—geniuses in the laboratory but socially challenged everywhere else. Enter beautiful, street-smart neighbor Penny, who aims to teach them a thing or two about life. Despite their on-again, off-again relationship in the past, Leonard and Penny have finally gotten married. Even Sheldon has found a female companion, entering into a relationship agreement with neurobiologist Amy Farrah Fowler, and he recently took their relationship to the next level by marrying her after a long courtship. In their free time, Leonard and Sheldon enjoy fantasy role-playing games with their ever-expanding universe of friends, including fellow scientists Koothrappali, Wolowitz, and Wolowitz's adorable microbiologist wife, Bernadette, who is adjusting to life with their two children.", "https://www.cbs.com/shows/big_bang_theory/about/", "https://i.imgur.com/uAEpVWk.jpg"),
    new Serie(5, "Sherlock", "BBC", 4, "Sherlock depicts consulting detective Sherlock Holmes (Benedict Cumberbatch) solving various mysteries in modern-day London. Holmes is assisted by his flatmate and friend, Dr John Watson (Martin Freeman), who has returned from military service in Afghanistan with the Royal Army Medical Corps", "https://www.bbc.co.uk/programmes/b018ttws", "https://i.imgur.com/02B7qhj.jpg"),
    new Serie(6, "A Very English Scandal", "BBC", 2, "A Very English Scandal is a fact-based three-part British television comedy-drama miniseries based on John Preston's book of the same name.", "https://www.bbc.co.uk/programmes/p065smy4", "https://i.imgur.com/D4y3DrQ.jpg"),
];
function loadSeries() {
    const tableBody = document.getElementById('seriesTableBody');
    if (!tableBody) {
        console.error('No se encontró el elemento con id "seriesTableBody"');
        return;
    }
    tableBody.innerHTML = '';
    series.forEach((serie) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${serie.id}</th>
            <td><a href="#" class="serie-link" data-serie-id="${serie.id}">${serie.name}</a></td>
            <td>${serie.channel}</td>
            <td>${serie.seasons}</td>
        `;
        tableBody.appendChild(row);
    });
    
    const serieLinks = document.querySelectorAll('.serie-link');
    serieLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const serieId = parseInt(link.getAttribute('data-serie-id') || '0');
            showSerieDetail(serieId);
        });
    });
    const averageSeasons = calculateAverageSeasons();
    const averageRow = document.createElement('tr');
    averageRow.className = 'average-row';
    averageRow.innerHTML = `
        <td colspan="4" class="text-center">Seasons average: ${averageSeasons}</td>
    `;
    tableBody.appendChild(averageRow);
}
function calculateAverageSeasons() {
    const totalSeasons = series.reduce((sum, serie) => sum + serie.seasons, 0);
    const average = totalSeasons / series.length;
    return Math.round(average);
}
function showSerieDetail(serieId) {
    const serie = series.find((s) => s.id === serieId);
    if (!serie) {
        console.error('Serie no encontrada');
        return;
    }
    const card = document.getElementById('serieDetailCard');
    const image = document.getElementById('serieImage');
    const title = document.getElementById('serieTitle');
    const description = document.getElementById('serieDescription');
    const link = document.getElementById('serieLink');
    if (!card || !image || !title || !description || !link) {
        console.error('Elementos del card no encontrados');
        return;
    }
    
    image.src = serie.poster;
    image.alt = serie.name;
    title.textContent = serie.name;
    description.textContent = serie.description;
    link.href = serie.webPage;
    
    card.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', loadSeries);
