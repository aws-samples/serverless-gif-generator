/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

// Mock event
const event = require('./testEvent.json')

// Mock environment variables
process.env.AWS_REGION = 'us-east-1'
process.env.localTest = true
process.env.SourceBucketName = 's3-lambda-1-gif-source'
process.env.SnippetsBucketName = 's3-lambda-1-gif-snippets'
process.env.SnippetSize = 30
process.env.DynamoDBTableName = 's3-lambda-1-gif-generator-DynamoDBTable-1PDH09EMH4KH1'

// Lambda handler
const { handler } = require('./app')

const main = async () => {
  console.time('localTest')
  console.dir(await handler(event))
  console.timeEnd('localTest')
}

main().catch(error => console.error(error))