/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

"use strict"

const AWS = require('aws-sdk')
AWS.config.update({region: process.env.AWS_REGION})
const eventbridge = new AWS.EventBridge()

const BATCH_SIZE = 10

// Send batch of messages to EventBridge
const writeBatch = async (items) => {

	console.log('writeBatch items: ', items.length)

	for (let i = 0; i < items.length; i += BATCH_SIZE ) {
		const tempArray = items.slice(i, i + BATCH_SIZE)

		// Create new params array
		const paramsArray = tempArray.map((item) => {
			return {
				DetailType: 'newVideoCreated',
				Source: 'custom.gifGenerator',
				Detail: JSON.stringify ({
					...item
				})
			}
		})

		// Create params object
		const params = {
			Entries: paramsArray
		}

		// Send to EventBridge
		const result = await eventbridge.putEvents(params).promise()
		console.log('Result: ', result)
	}
}

module.exports = { writeBatch }
