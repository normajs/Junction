#!/usr/bin/env bash
DEFAULT="circleci"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=assets.newspring.cc
DIR=./junction.js
aws  s3  sync $DIR s3://$BUCKET/ --profile "$PROFILE"