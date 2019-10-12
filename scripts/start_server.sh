#!/bin/bash
cd ~
pm2 kill
pm2 start apps.json all