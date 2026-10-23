# Fixallis

Site para vender serviços de automação de WhatsApp, dividido em páginas.

Páginas:

- `index.html` — início: apresentação, demonstração do chat, problemas comuns, quem faz e chamada para contato
- `servicos.html` — serviços e como funciona
- `exemplos.html` — fluxos por tipo de negócio
- `planos.html` — planos e perguntas frequentes (`planos.html#duvidas`)
- `contato.html` — formulário que abre a mensagem pronta no WhatsApp

Arquivos compartilhados:

- `styles.css` — visual (cores, fontes, tema claro e escuro)
- `assets/fixallis-mark.svg` — logo em vetor (azul `#016ECB`, fundo transparente)
- `script.js` — número do WhatsApp, mensagem padrão, formulário e a animação do chat

O menu do topo e o rodapé se repetem em cada página. Se adicionar ou renomear uma página, atualize os cinco arquivos.

## Antes de publicar

1. Abra `script.js` e troque `whatsapp: '5500000000000'` pelo seu número (DDI + DDD + número, só dígitos).
2. Ajuste os preços na seção `PLANOS` do `planos.html`.
3. Reescreva a seção `SOBRE` com a sua história.

## Publicar grátis no GitHub Pages

No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
Em alguns minutos o site fica em `https://texxugo.github.io/portfolio/`.
