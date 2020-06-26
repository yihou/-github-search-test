# Github Search
Github repo search engine.

## Prerequisite
Below are the required software to build and run the program.
- Node >= v14
- Yarn
- Docker + Docker Compose (optional if use `Mongodb`)
- Mongodb (optional if use `Docker`)

## Get Started
1. Install dependencies
    ```shell script
    yarn
    ```
1. Copy .env.example and fill in the details
    ```shell script
    cp .env.example .env
    ```
1. Start Mongodb Docker
    ```shell script
    docker-compose up -d
    ```
1. Build client before start
    ```shell script
    yarn client-build
    ```
1. Start client
    ```shell script
    yarn client-start
    ```
1. Start server
    ```shell script
    yarn client-start
    ```


## Progress
Pending features to be done

- [ ] Search Filter
- [ ] Search Pagination
- [ ] Admin login
- [ ] Report for admin
