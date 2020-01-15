import { Injectable } from '@angular/core';
import { Set } from '@nx-apollo-example/api-interfaces';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const getAllSetsQuery = gql`
{
  allSets{
    id
    name
    numParts
    year
  }
}
`;

const addSetMutation = gql`
mutation addSet($name: String!, $year: String!, $numParts: Int!) {
  addSet(name: $name, year: $year, numParts: $numParts) {
    id
    name
    numParts
    year
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SetService {
  sets$: Observable<Set[]>;

  constructor(private apollo: Apollo, ) {
    this.sets$ = this.apollo
      .watchQuery({
        query: getAllSetsQuery,
      })
      .valueChanges.pipe(map((result: ApolloQueryResult<{ allSets: Set[] }>) => result.data.allSets));
  }

  addSet(set: Partial<Set>) {
    return this.apollo.mutate({
      mutation: addSetMutation,
      variables: set,
      update: (store, result: ApolloQueryResult<{ addSet: Set }>) => {
        const data: { allSets: Set[] } = store.readQuery({ query: getAllSetsQuery });
        data.allSets = [...data.allSets, result.data.addSet];
        // Write our data back to the cache.
        store.writeQuery({ query: getAllSetsQuery, data });
      },
    })
  }
}
