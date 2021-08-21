### Docker
[Docker](https://hub.docker.com/) é um projeto de código aberto que automatiza o desenvolvimento de aplicações dentro de agregadores de software, proporcionando uma capa adicional de abstração e automatização de máquinas virtualizadas de aplicações em múltiplos sistemas operativos.​

#### Atalhos Docker 
Abaixo segue uma lista de atalhos para serem utilizados na linha de comando.

- Processos que estão rodando na máquina:
`docker ps` \

- Rodar docker:
`docker run` \
   - Inserir nome 
   `--name postgres` \ 
   - Configurar usuário:
   `-e POSTGRES_USER<insertUser>` \
   - Configurar senha:
   `-POSTGRES_PASSWORD<insertPassword>` \
   - Configurar banco de dados:
   `-e POSTGRES-DB-heroes <dataBase>` \
   - Configurar porta exterior e interior:
   `-p 5432-5432 <portExt&Int>` \
   - Executar em segundo plano, depois que foi baixada
   `-d` \
   `postgres`

   docker run \
    --name postgres \ 
    -e POSTGRES_USER \
    -POSTGRES_PASSWORD \
   -e POSTGRES-DB-heroes \
   -p 5432-5432 \
   -d \
   postgres