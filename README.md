# Portfolio de Arquitetura

Este é o repositório para a aplicação de portfólio de arquitetura, composta por uma API Laravel no backend e uma aplicação React no frontend.

## Iniciando a Aplicação

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/portfolio-arquitetura.git
cd portfolio-arquitetura
```

Execute o Docker Compose para iniciar os serviços:
```bash
docker-compose up -d
```

Este comando construirá e iniciará os contêineres do frontend, backend, MySQL, Redis, Meilisearch, Mailpit e Selenium.

Nota: Se a porta 80 estiver ocupada, identifique o PID do processo que está usando a porta 80. Em sistemas Unix, use o comando:

```bash
sudo lsof -i :80
```

Em seguida, execute:

```bash
sudo kill <PID>
```

Acesse a aplicação:
```bash
Frontend: http://localhost:3000
Backend: http://localhost
```

Para parar os serviços, execute:
```bash
docker-compose down
```

Após iniciar os serviços, vá para o diretório do backend e execute o comando Composer para atualizar e recriar o banco de dados:
```bash
cd backend
composer refresh-db
```

## Detalhes dos Serviços

### Frontend

O frontend é construído com React. O código-fonte está localizado na pasta `frontend`. O Dockerfile para o frontend está configurado para compilar o código e iniciar o servidor de desenvolvimento.

### Backend

O backend é construído com Laravel. O código-fonte está localizado na pasta `backend`. O Dockerfile para o backend instala as dependências do Laravel, expõe as portas necessárias e inicia o servidor.

### MySQL, Redis, Meilisearch, Mailpit e Selenium

Esses serviços são usados para o backend e podem ser acessados em suas respectivas portas.

## Contribuindo

Se você quiser contribuir, siga as diretrizes de contribuição neste repositório.

