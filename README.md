# Serverless Application with GitHub Actions Demo

This repo is just a small demo on deploying Serverless Applications via GitHub Actions. In this example we use [AWS SAM](https://aws.amazon.com/serverless/sam/).

## Pipeline

The pipeline is located in the `.github/workflows` folder.

In summary, it has the following work flows:
1. When creating a `feature/` branch and pushing code, the unit tests are run and the application is built.
2. If unit tests pass, the application is deployed to a new environment created for that `feature/` branch
3. Assuming the feature is complete, when the branch is merged to `main` and it is deleted in GitHub, the feature branch environment is deleted.
4. Additionally in a separate workflow, the tests are run again, and the application is built and packaged into an artifact which is stored in AWS S3.
5. Assumming the tests and build pass, the artifact is deployed to a Test environment.
6. Integration tests are then run against the Test environment.
7. Assuming the integration tests pass the artifact is deployed to a Prod environment.

## Running the pipeline

To run the pipeline, create a `feature/` branch and push the code up to GitHub. This will trigger steps 1-2 above. Merge the branch into `main` via a Pull Request and delete the `feature/` branch to to trigger the rest of the pipeline.

## Required AWS Resources

The pipeline needs the following AWS Resources, which can be setup by running `sam pipeline bootstrap` (where each stage refers to an environment e.g. Test and Prod which may or may not be within the same account).
- `TESTING_PIPELINE_EXECUTION_ROLE` - an IAM role that the pipeline assumes in order to access AWS resources (specifically for the Test stage)
- `TESTING_CLOUDFORMATION_EXECUTION_ROLE` - an IAM role that allows CloudFormation to create/delete the required resources (specifically for the Test stage)
- `TESTING_ARTIFACTS_BUCKET` - an S3 bucket to store the built artifacts (specifically for the Test stage)
- `PROD_PIPELINE_EXECUTION_ROLE` - an IAM role that the pipeline assumes in order to access AWS resources (specifically for the Prod stage)
- `PROD_CLOUDFORMATION_EXECUTION_ROLE` - an IAM role that allows CloudFormation to create/delete the required resources (specifically for the Prod stage)
- `PROD_ARTIFACTS_BUCKET` - an S3 bucket to store the built artifacts (specifically for the Prod stage)

### Authenticating with AWS

In order to authenticate with AWS, we need an IAM user which has permission to assume each of the pipeline execution roles. When this user is created, save the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` secrets in GitHub.

### SAM Bootstrap

As mentioned above the easiest way to create all the above resources is to use the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html). Run the following command and follow the prompts to create the resources:
```
sam pipeline bootstrap
```

Following the prompts, create 2 stages `test` and `prod`. Then replace the values within the pipeline template at `.github/workflows` with the ARNs of the newly created resources.

## Cleaning up

To delete resources run the following commands:
```
sam delete --stack-name hello-world-test
sam delete --stack-name hello-world-prod
```

In the AWS console, delete any remaining CloudFormation stacks that were in use by the SAM CLI.
