"""
  This is the root schema for the server. All apps will have their GQL schemas imported here
  to be exposed to the client.
"""
import graphene
import projects.schema


class Query(projects.schema.Query, graphene.ObjectType):
    pass


class Mutation(projects.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
