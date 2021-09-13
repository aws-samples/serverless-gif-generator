
# S3-to-Lambda examples: Serverless GIF generator

This example application shows how to build a serverless GIF creator. 

Many video streaming services show GIF animations in the frontend when users fast forward and rewind throughout a video. This helps customers see a preview and makes the user interface more intuitive. 

To learn more about how this application works, see the 2-part post on the AWS Compute Blog:

* Part 1: https://aws.amazon.com/blogs/compute/building-a-serverless-gif-generator-with-aws-lambda-part-1/.
* Part 2: https://aws.amazon.com/blogs/compute/building-a-serverless-gif-generator-with-aws-lambda-part-2/.

** Running this application will incur costs. It uses services not in the AWS Free Tier and generates a large amount of data. **

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

```bash
.
├── README.MD              <-- This instructions file
├── backend                <-- Source code for the backend application
├── frontend               <-- Source code for the Vue.js frontend application
├── server-example         <-- Server-based version for comparison
```

## Requirements

* An AWS account. ([Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.)
* AWS CLI already configured with Administrator permission
* [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) - **minimum version 0.48**.
* [NodeJS 14.x installed](https://nodejs.org/en/download/)
* [Vue.js and Vue CLI installed](https://vuejs.org/v2/guide/installation.html)

## Backend installation Instructions 

1. First, create a Lambda layer containing the FFmpeg and FFprobe binaries. Log into your AWS Management Console and navigate to: https://serverlessrepo.aws.amazon.com/applications/us-east-1/145266761615/ffmpeg-lambda-layer.

2. Choose *Deploy* and note the ARN for the resulting Lambda layer.

3. Clone this repo onto your local development machine:
```
git clone https://github.com/aws-samples/serverless-gif-generator
```

4. Deploy the backend application:
```
sam build
sam deploy --guided
```

5. During the prompts: 
- Enter a unique source S3 bucket name.
- Enter a unique destination S3 bucket name.
- To generate one frame per second in addition to GIF files, set *GenerateFrames* to 'true' (otherwise use 'false').
- Enter a snippet size
- Enter the MMmpeg layer ARN from step 2.

After deployment, upload an MP4 file to the source S3 bucket and the application generates output files in the destination S3 bucket.

### Modifying settings

Note that the snippet size is determines how many GIF files are created. The default of 30 creates one file per 30 seconds of video. A lower value results in more GIF values (and more concurrent Lambda instances during runtime).

To reduce the amount of data produced by this example application, set 'GenerateFrames' to 'false' in deployment. This prevents the application from creating one JPG per second of video.

## Frontend installation instructions

The frontend code is saved in the `frontend` subdirectory. 

1. Change directory into the frontend code directory, and run the NPM installation:

```
cd ../frontend
npm install
```
2. After installation is complete, you can run the application locally:

```
npm run serve
```

In the frontend UI, set the snippetSize to the same value used in the backend. Provide your destination bucket name and video URL, and the frontend will retrieve the GIF files and individual frames when the slider is used.

## Cleanup

1. Manually delete any objects in the application's S3 buckets.
2. Use the CloudFormation console to delete all the stacks deployed.

## Next steps

The AWS Compute Blog series at the top of this README file contains additional information about the application design and architecture.

If you have any questions, please contact the author or raise an issue in the GitHub repo.

==============================================

Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0

