#!/bin/sh
# rm ./yarn.lock
git push
git status  
git pull --rebase origin master   #domnload data
git stash pop
yarn
yarn build
pm2 restart 4
pm2 save