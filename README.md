# Buy+ · landing page

Landing page estática da plataforma de e-commerce **Buy+**, pronta para o GitHub Pages.

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `buyplus`) e envie estes arquivos para a branch `main`.
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em 1 a 2 minutos a página abre em `https://SEU-USUARIO.github.io/buyplus/`.

## Antes de publicar

Abra `app.js` e preencha o contato no topo do arquivo:

```js
const CONTATO = {
  whatsapp: '5511999999999',          // só números, com 55 e DDD
  email: 'contato@seudominio.com.br'
};
```

Todos os botões "Criar minha loja" e "Falar com a equipe" passam a abrir o WhatsApp com uma
mensagem pronta, incluindo o nome de loja e o segmento que o visitante escolheu na página.

## Estrutura

- `index.html` · conteúdo
- `styles.css` · visual e responsivo
- `app.js` · loja de demonstração interativa, documentos, etapas e animações
- `assets/` · logos e fotos (créditos no rodapé da página)
