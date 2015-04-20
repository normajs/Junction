#!/usr/bin/env bash
DEFAULT="circleci"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=junction.newspring.cc
DIR=.
# aws  s3  sync $DIR s3://$BUCKET/ --profile "$PROFILE"
aws s3 sync ./junction.js s3://$BUCKET/