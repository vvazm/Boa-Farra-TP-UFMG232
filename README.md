# Boa-Farra-TP-UFMG232
Trabalho Prático de Engenharia de Software UFMG

"BoaFarra" - Rede social para frequentadores de bares.

# Escopo do Trabalho:

Boa Farra pretende ser uma pequena rede social para os frequentadores de bares de Belo Horizonte. Sendo a cultura de bares um ícone integral da cidade, o objetivo é conectar pessoas e fornecer uma experiência expandida para qualquer barzinho. No projeto piloto a ideia é que o usuário tenha um feed de notícias onde pode postar fotos em um bar específico, que será agrupado na página do bar dentro do BoaFarra, sempre mostrando da foto mais recente no topo, até a mais antiga no fundo do feed. O sistema contará então com as funcionalidades do usuário criar uma conta, fazer login no site, ter a capacidade de postar uma foto em um bar específico e ter acesso a um feed agrupado dos bares.


# Membros da Equipe:

João Gabriel - Full Stack

Leonardo Salim - Full Stack

Salvador - Full Stack

Vítor Vaz Moreira - Full Stack

# Tecnologias:

Frontend:
-- Angular
--- TypeScript 
--- Angular Material for Template
--- Npm for dependencies
--- Docker for Containerization and Deployment


Backend:
-- Node
--- JavaScript
--- Express
--- Npm for dependencies
--- Docker for Containerization and Deployment

Database:
-- MongoDB
--- Standalone deployment

# Backlog das Histórias:
- Como usuário, gostaria de ter uma conta que posso usar para autenticar no sistema.
- Como usuário, gostaria de visualizar as ultimas fotos por bares em um feed cronologico.
- Como usúario, gostaria de postar uma foto em um bar.
- Como bar gostaria de visualizar todos os usuarios que compartilharam posts do meu bar.
- Como usuário gostaria de compartilhar um  post de um bar.
- Como usuário gostaria de ter uma lista com meus bares favoritos.
- Como usuário gostaria de fazer um roteiro de bares.
- Como usuário gostaria de filtrar bares por localização.
- Como usuário gostaria de interagir com outros usuários.
- Como usuário gostario usuario gostaria de comentar em posts.
- Como bar, gostaria de promover um post do meu bar. (EPICA)

# Backlog da Sprint:
- Implementar Base Tecnologica Frontend: Angular com Angular Material. @leosalim
- Implementar Base Tecnologica Backend: Node.JS com Express.
- Como usuário, gostaria de ter uma conta que posso usar para autenticar no sistema.
	- Como usuário, gostaria de Criar conta
		- Formulario Frontend @leosalim
		- Rest Backend - POST
		- Tabela Conta 
	- Como usuário, gostaria de Fazer Login
		- Formulário Login @leosalim
		- Filtro de autenticação Login Frontend (Adiciona o token a requisições feitas por um usuario autenticado)
		- Rest Backend - POST
	- Como usuário, gostaria de Visualizar minha conta	
		- Formulário FrontEnd 
		- Rest Backend - GET
	- Como usuário, gostaria de Alterar minha foto
		- Botão alterar foto no formulário visualizar conta
		- Rest Backend - POST
	- Como usuário, gostaria de Alterar senha 
		- Formulario alterar senha, apartir do minha conta
		- Backend alterar senha - POST
- Como usuário, gostaria de visualizar as ultimas fotos por bares em um feed cronologico.
	- Feed
		- Componente Post Frontend @leosalim
		- Componente Feed Frontend @leosalim
		- Rest Backend - GET
		- Tabela Posts
- Como usúario, gostaria de postar uma foto em um bar.
	- Formulário postar foto
		- Formulário Frontend
		- Rest Backend - POST

- Como bar gostaria de visualizar todos os usuarios que compartilharam posts do meu bar.
	- Componente meus fregueses
		- Componente recebe JSON, e lista em tela, os nomes dos fregueses fotos, numero de checkin.
	- Backend Listar Checkins feitos no meu bar
		- Retorna array JSON com nome do fregues, numero de checkins no meu bar, e foto do cliente.
