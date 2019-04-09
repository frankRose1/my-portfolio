import graphene
from graphql import GraphQLError
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    current_admin = graphene.Field(UserType)

    def resolve_current_admin(self, info):
        # user will be set in context if GQL_JWT finds a user based on the token in auth headers
        user = info.context.user
        if user.is_anonymous or not user.is_superuser:
            raise GraphQLError('Unauthorized.')

        return user
