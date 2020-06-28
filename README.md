# Github Search
Github repo search engine.

## Prerequisite
Below are the required software to build and run the program.
- Node >= v14
- Yarn
- Docker + Docker Compose (optional if use local installed `Mongodb`)
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
1. Go to [github](https://github.com/settings/tokens), 
generate token and paste it in .env `GITHUB_ACCESS_TOKEN`
1. Start Mongodb Docker (optional if using locally installed mongodb)
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

### Admin Report page
After `client` and `server` started, to login and view search report,
go to `/login` page and fill in the details below:
```text
email: admin@sample.com
password: 123123
```

## Progress
Features

- [x] Proper search Filter
- [x] Search Pagination
- [x] Admin login
- [x] Report for admin


## Thoughts
After trying out `Baseui`, it's a great UI framework 
but because of its nature of breaking down style into micro classes, 
harder for style inspection and debugging, hence took me sometime to get the hang of it.

### BaseUI

#### Pros:
- Good web performance
- Ready for customizations and theme
#### Cons:
- Learning curves high


### Things to improve
- Server side response standardisation (error messages)
- Server side handle database connection properly
- Server side graphql search caching
- Server side search handling optimizations (on indexing search results should use callbacks)
- Typings for APIs response and params to share among server side and client side
- Frontend UI/UX improvements
- Database design, to optimize the `search_indexes` table, denormalize `searchResult` column to `1 to many` relationship
