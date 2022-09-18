
rm -rf ./app/dist
rm -rf ./api/dist

(
    cd app
    yarn install
    yarn build
)

cp -R ./app/dist ./api/dist

(
    cd api
    firebase deploy
)
