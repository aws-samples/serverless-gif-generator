
/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

// Set paths for ffpmeg/ffprobe 
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path 
const { exec } = require('child_process')
const ffTmp = './output'

// Configure these settings before running
const length = 10323
const inputVideo = 'test.mp4'
const snippetSize = 30

// Promisified wrapper for child_process.exec
const execPromise = async (command) => {
	return new Promise((resolve, reject) => {
		const ls = exec(command, function (error, stdout, stderr) {
		  if (error) {
		    console.log('Error: ', error)
		    reject(error)
		  }
		  if (stdout) console.log('stdout: ', stdout)
		  if (stderr) console.log('stderr: ' ,stderr)
		})
		
		ls.on('exit', (code) => {
		  if (code != 0) console.log('execPromise finished with code ', code)
			resolve()
		})
	})
}

// Main handler
const main = async () => {
  const baseFilename = inputVideo.split('.')[0]

	console.time('task')
	for (let start = 0; start < length; start += snippetSize) {
		const gifName = `${baseFilename}-${start}.gif`
		const end = start + snippetSize -1

		console.log('Now creating: ', gifName)

		// Generates gif in local tmp
		await execPromise(`${ffmpegPath} -loglevel error -ss ${start} -to ${end} -y -i "${inputVideo}" -vf "fps=10,scale=240:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${ffTmp}/${gifName}`)
		// Generates frames in local tmp
		await execPromise(`${ffmpegPath} -loglevel error -ss ${start} -to ${end} -i "${inputVideo}" -vf fps=1 ${ffTmp}/${baseFilename}-${start}-frame-%d.jpg`)
	}
	console.timeEnd('task')
}

main()

