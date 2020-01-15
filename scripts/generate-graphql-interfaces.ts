import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
    typePaths: ['./apps/api/src/app/**/*.graphql'],
    path: './libs/api-interfaces/src/lib/graphql.ts'
});