#!/bin/bash
# Script to add API restrictions to a Google Cloud API key


if [ "$#" -ne 2 ]; then
  echo "Usage: $0 PROJECT_NUMBER KEY_ID"
  exit 1
fi

PROJECT_NUMBER=$1
KEY_ID=$2

echo "Adding API restrictions to API key $KEY_ID in project $PROJECT_NUMBER..."

gcurl https://apikeys.googleapis.com/v2/projects/${PROJECT_NUMBER}/locations/global/keys/${KEY_ID} \
  --request POST \
  --data '{
    "restrictions": {
      "api_targets": [
        {
          "service": "generativeai.googleapis.com"
        }
      ]
    }
  }'

echo "API restrictions added. Please verify in Google Cloud Console."
