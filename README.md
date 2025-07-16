# English Test Platform

Plataforma de teste de inglês com questões interativas sobre gramática, vocabulário e compreensão de texto.

## Como Publicar no GitHub Pages

### Método 1: Upload direto pelo GitHub (Mais Fácil)

1. **Crie uma conta no GitHub**
   - Acesse https://github.com
   - Clique em "Sign up" e crie sua conta gratuita

2. **Crie um novo repositório**
   - Clique no botão "+" no canto superior direito
   - Selecione "New repository"
   - Nome do repositório: `english-test-platform`
   - Descrição: "Plataforma de teste de inglês interativa"
   - Marque como **Public**
   - NÃO inicialize com README
   - Clique em "Create repository"

3. **Faça upload dos arquivos**
   - Na página do repositório, clique em "uploading an existing file"
   - Arraste todos os arquivos da pasta do projeto:
     - `index.html`
     - `admin.html`
     - `app.js`
     - `questions.js`
     - `styles.css`
   - Escreva uma mensagem de commit: "Initial upload"
   - Clique em "Commit changes"

4. **Ative o GitHub Pages**
   - No repositório, clique em "Settings" (configurações)
   - Role até a seção "Pages" no menu lateral
   - Em "Source", selecione "Deploy from a branch"
   - Em "Branch", selecione "main" e "/ (root)"
   - Clique em "Save"

5. **Acesse seu site**
   - Aguarde alguns minutos (até 10 minutos na primeira vez)
   - Seu site estará disponível em:
     `https://[seu-usuario].github.io/english-test-platform/`

### Método 2: Usando Git (Para usuários avançados)

```bash
# No diretório do projeto
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[seu-usuario]/english-test-platform.git
git push -u origin main
```

## Outras Opções Gratuitas

### Netlify
1. Acesse https://www.netlify.com
2. Arraste a pasta do projeto para a área indicada
3. Seu site estará online instantaneamente

### Vercel
1. Acesse https://vercel.com
2. Conecte com GitHub
3. Importe o projeto
4. Deploy automático

### Surge.sh
1. Instale Node.js
2. Execute: `npm install -g surge`
3. No diretório do projeto: `surge`
4. Siga as instruções

## Estrutura do Projeto

```
english-test-platform/
├── index.html       # Página principal do teste
├── admin.html       # Painel administrativo
├── app.js          # Lógica da aplicação
├── questions.js    # Banco de questões
└── styles.css      # Estilos CSS
```

## Funcionalidades

- ✅ 25 questões variadas de inglês
- ✅ Múltipla escolha, arrastar e soltar, preencher lacunas
- ✅ Textos de referência visíveis
- ✅ Opções de resposta para todas as questões
- ✅ Sistema de pontuação
- ✅ Painel administrativo para ver resultados

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage para armazenamento de dados

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.