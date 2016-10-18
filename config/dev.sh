#!/bin/bash

export NODE_ENV=dev
export ROOT_URL=http://dev.frameingo.com
export PORT=7000

meteor run --settings config/settings/dev.json
