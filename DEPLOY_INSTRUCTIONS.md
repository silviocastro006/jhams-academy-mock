# Instruções para Deploy no GitHub Pages

## Pré-requisitos
- Conta no GitHub
- Git instalado no seu computador
- Node.js instalado

## Passo a Passo

### 1. Configuração do Repositório no GitHub

1. Acesse o GitHub e crie um novo repositório
2. Dê um nome ao repositório (ex: `jhams-academy`)
3. Deixe o repositório público (obrigatório para GitHub Pages gratuito)
4. Não inicialize com README, .gitignore ou licença (já temos os arquivos)

### 2. Configuração Local

1. **Atualize o arquivo package.json:**
   - Substitua `<USERNAME>` pelo seu nome de usuário do GitHub
   - Substitua `<REPO_NAME>` pelo nome do seu repositório
   
   Exemplo: se seu usuário é `joao123` e o repositório é `jhams-academy`:
   ```json
   "homepage": "https://joao123.github.io/jhams-academy"
   ```

2. **Conecte seu projeto local ao repositório GitHub:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   ```

### 3. Deploy

1. **Faça o commit e push do código:**
   ```bash
   git add .
   git commit -m "Preparando para deploy no GitHub Pages"
   git push -u origin main
   ```

2. **Execute o deploy:**
   ```bash
   npm run deploy
   ```

### 4. Configuração do GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Role para baixo até a seção **Pages**
4. Em **Source**, selecione **Deploy from a branch**
5. Em **Branch**, selecione **gh-pages**
6. Clique em **Save**

### 5. Acesso ao Site

Após alguns minutos, seu site estará disponível em:
`https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO`

## Comandos Úteis

- **Build local:** `npm run build`
- **Deploy:** `npm run deploy`
- **Desenvolvimento:** `npm run dev`

## Observações Importantes

1. **Sempre faça o build antes do deploy** - O comando `npm run deploy` já faz isso automaticamente
2. **Aguarde alguns minutos** - O GitHub Pages pode demorar até 10 minutos para atualizar
3. **Verifique o console** - Se houver erros, eles aparecerão no console do navegador
4. **Cache do navegador** - Se não ver as mudanças, limpe o cache (Ctrl+F5)

## Solução de Problemas

### Erro 404
- Verifique se o repositório está público
- Confirme se a branch `gh-pages` foi criada
- Verifique se o GitHub Pages está configurado corretamente

### Site não carrega corretamente
- Verifique se a URL no `homepage` está correta
- Confirme se todos os arquivos foram buildados corretamente
- Verifique o console do navegador para erros

### Problemas com dependências
- Use `npm install --legacy-peer-deps` se houver conflitos
- Certifique-se de que todas as dependências estão instaladas

## Atualizações Futuras

Para atualizar o site após fazer mudanças:

1. Faça suas alterações no código
2. Commit e push para o repositório:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```
3. Execute o deploy novamente:
   ```bash
   npm run deploy
   ```

O site será atualizado automaticamente!

