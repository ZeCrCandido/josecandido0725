async function carregarPodcast() {
        try {
            const response = await fetch('../data/sounds.rss');
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");
            
            const itens = xml.querySelectorAll("item");
            const container = document.getElementById('podcast-container');

            itens.forEach(item => {
                const titulo = item.querySelector("title")?.textContent;
                const linkOriginal = item.querySelector("link")?.textContent;
                const imagem = item.getElementsByTagName("itunes:image")[0]?.getAttribute("href");
                const descricao = item.querySelector("description")?.textContent.replace(/<\/?[^>]+(>|$)/g, "");

                const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(linkOriginal)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

                const card = `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <div class="card-img-container">
                            <img src="${imagem}" class="card-img-top" alt="${titulo}">
                        </div>
                        <div class="card-body">
                            <h6 class="card-title fw-bold mt-2">${titulo}</h6>
                            <p class="card-text text-muted">${descricao}</p>
                            
                            <iframe class="sc-player" scrolling="no" frameborder="no" allow="autoplay" 
                                src="${embedUrl}">
                            </iframe>

                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <small class="text-body-secondary small">Podcast Hotel</small>
                                <a href="${linkOriginal}" target="_blank" class="btn btn-sm btn-outline-primary">Abrir</a>
                            </div>
                        </div>
                    </div>
                </div>`;
                container.innerHTML += card;
            });
        } catch (erro) {
            console.error("Erro:", erro);
        }
    }

    carregarPodcast();