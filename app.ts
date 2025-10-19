
import { Serie } from './serie';
import { series } from './data';

function loadSeries(): void {
    const tableBody: HTMLElement | null = document.getElementById('seriesTableBody');
    
    if (!tableBody) {
        console.error('No se encontró el elemento con id "seriesTableBody"');
        return;
    }
    
    
    tableBody.innerHTML = '';
    
    series.forEach((serie: Serie) => {
        const row: HTMLTableRowElement = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${serie.id}</th>
            <td><a href="#" class="serie-link" data-serie-id="${serie.id}">${serie.name}</a></td>
            <td>${serie.channel}</td>
            <td>${serie.seasons}</td>
        `;
        tableBody.appendChild(row);
    });
    
   
    const serieLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.serie-link');
    serieLinks.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const serieId: number = parseInt(link.getAttribute('data-serie-id') || '0');
            showSerieDetail(serieId);
        });
    });
    
    const averageSeasons: number = calculateAverageSeasons();
    const averageRow: HTMLTableRowElement = document.createElement('tr');
    averageRow.className = 'average-row';
    averageRow.innerHTML = `
        <td colspan="4" class="text-center">Seasons average: ${averageSeasons}</td>
    `;
    tableBody.appendChild(averageRow);
}

function calculateAverageSeasons(): number {
    const totalSeasons: number = series.reduce((sum: number, serie: Serie) => sum + serie.seasons, 0);
    const average: number = totalSeasons / series.length;
    return Math.round(average);
}

function showSerieDetail(serieId: number): void {
    const serie: Serie | undefined = series.find((s: Serie) => s.id === serieId);
    
    if (!serie) {
        console.error('Serie no encontrada');
        return;
    }
    
    const card: HTMLElement | null = document.getElementById('serieDetailCard');
    const image: HTMLImageElement | null = document.getElementById('serieImage') as HTMLImageElement;
    const title: HTMLElement | null = document.getElementById('serieTitle');
    const description: HTMLElement | null = document.getElementById('serieDescription');
    const link: HTMLAnchorElement | null = document.getElementById('serieLink') as HTMLAnchorElement;
    
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
