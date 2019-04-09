"""
  This is the root schema for the server. All apps will have their GQL schemas imported here
  to be exposed to the client.
"""
import graphene
import graphql_jwt
import projects.schema
import users.schema


class Query(users.schema.Query, projects.schema.Query, graphene.ObjectType):
    pass


class Mutation(projects.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field() # returns a JWT if valid credentials are provided
    verify_token = graphql_jwt.Verify.Field() # verifies the JWT in auth headers
    refresh_token = graphql_jwt.Refresh.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)
