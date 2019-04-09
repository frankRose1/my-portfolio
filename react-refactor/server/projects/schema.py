import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from .models import Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)
    search_projects = graphene.List(ProjectType, search=graphene.String())
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        return Project.objects.get(id=id)

    def resolve_search_projects(self, info, search=None):
        filter_opts = (
          Q(title__icontains=search) |
          Q(description__icontains=search)
        )
        return Project.objects.filter(filter_opts)

class CreateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        demo_link = graphene.String(required=False)
        github_link = graphene.String(required=False)
        tags = graphene.String()
        date_added = graphene.String()
        image_url = graphene.String()

    def mutate(self, info, **kwargs):

        project = Project.objects.create(
            title=kwargs.get('title'),
            description=kwargs.get('description'),
            demo_link=kwargs.get('demo_link'),
            github_link=kwargs.get('github_link'),
            tags=kwargs.get('tags'),
            date_added=kwargs.get('date_added'),
            image_url=kwargs.get('image_url'),
        )

        project.save()
        return CreateProject(project=project)


class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
