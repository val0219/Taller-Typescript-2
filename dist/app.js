import { series } from './data';
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
