# IFIXTrack

## Descrição
O **IFIXTrack** é um projeto pessoal desenvolvido para acompanhar informações relevantes dos 50 primeiros Fundos Imobiliários (FIIs) do índice IFIX. A plataforma permite aos usuários visualizar dados atualizados sobre preço, variação de mercado e personalizar quais fundos deseja acompanhar.

## Funcionalidades

- **Visualização de dados dos FIIs:**
  - Preço atual
  - Preço máximo e mínimo das últimas 52 semanas
  - Variação do preço atual em relação às últimas 52 semanas
  - Preço máximo e mínimo do dia

- **Seleção personalizada de FIIs:**
  - Ao acessar a tela inicial, os 50 FIIs aparecem listados
  - O usuário pode selecionar os FIIs de interesse clicando neles
  - Os FIIs selecionados ficam acessíveis através do menu

- **Gestão de conta:**
  - Trocar nome de usuário
  - Deletar conta
  - Fazer logout

- **Autenticação:**
  - Página de login e registro

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS e JavaScript
- **Backend:** Node.js
- **Banco de Dados:** MySQL
- **Consumo de API:** brapi.dev

## Configuração do Projeto

### Requisitos
- Node.js instalado
- MySQL configurado

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/IFIXTrack.git
   ```

2. Instale as dependências:
   ```bash
   npm install nodemon cors express mysql2
   ```

3. Configure o banco de dados diretamente no código, pois não há arquivo `.env`.

4. Execute as migrações e inicialize o banco de dados.

5. Inicie o servidor com o Nodemon:
   ```bash
   npx nodemon server.js
   ```

### Uso
- Acesse `http://localhost:3000` no navegador.
- Crie uma conta ou faça login.
- Selecione os FIIs de interesse e acompanhe as informações financeiras atualizadas.

## Contribuição
Se você deseja contribuir com melhorias, envie um Pull Request com uma descrição detalhada das alterações propostas.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato
Kenay Gomes Nobre - [Seu LinkedIn](https://www.linkedin.com/in/seu-perfil)

