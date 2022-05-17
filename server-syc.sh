#!/bin/sh
# rm ./yarn.lock
git push
git status  
git pull
git stash pop
yarn
yarn build
pm2 restart 6
pm2 save
