/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

"use strict"

// Set paths for ffpmeg/ffprobe depending on local/Lambda usage
const ffmpegPath = process.env.localTest ? require("@ffmpeg-installer/ffmpeg").path : "/opt/bin/ffmpeg"
const ffprobePath = process.env.localTest ? require("@ffprobe-installer/ffprobe").path : "/opt/bin/ffprobe"

// Configure ffmpeg
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

// Used to detect video length
const ffProbe = async (source) => {
  console.log("ffProbe: ", source)
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(source, function (err, metadata) {
      if (err) return reject(err)
      resolve(metadata)
    })
  })
}

module.exports = { ffProbe }

