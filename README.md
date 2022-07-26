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
