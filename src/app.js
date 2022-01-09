const app = document.querySelector('#app');

fetch('http://localhost:8000/top-picks')
    .then(response => {
        return response.json();
    }).then(data => {
        data.forEach(topPicks => {
            const topPickItems =
                `<div><h3>` + topPicks.title + `</h3><p>` + topPicks.url + `</p><h5>` + topPicks.author + `</h5></div>`;
            app.insertAdjacentHTML("beforeend", topPickItems);
        })
    })
    .catch(err => console.log(err))
