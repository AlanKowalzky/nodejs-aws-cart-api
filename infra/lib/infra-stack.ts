import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', {
      vpcId: 'vpc-0d16b7ccf79fadb50',
    });

    // Subnets
    const subnets = [
      'subnet-010bdd05db99b0fbd',
      'subnet-0ca84313c3cacbe19',
      'subnet-0fa3afd92e0be3d0d',
      'subnet-08cc09a19b1a369fc',
      'subnet-0c9e4613837bce057',
      'subnet-082406b9d0d4e960d',
    ];

    // Lambda function
    const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', { // TODO: change MyLambdaFunction to Your lambda name
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler', // TODO: update path to your handler
      code: lambda.Code.fromAsset('path/to/your/lambda/code'), // TODO: update path to lambda code
      vpc: vpc,
      vpcSubnets: { subnets: subnets.map((subnetId) => ec2.Subnet.fromSubnetId(this, subnetId, subnetId)) },
      environment: {
        DATABASE_URL:
          'postgresql://placeholder:placeholder@database-1.cexgwe8kuwfo.us-east-1.rds.amazonaws.com:5432/', // default db name
      },
    });
  }
}
