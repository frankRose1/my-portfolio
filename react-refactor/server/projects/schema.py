import graphene
from graphene_django import DjangoObjectType
from .models import Project

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)

    def resolve_projects(self, info):
        return Project.objects.all()

class CreateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        demo_link = graphene.String(required=False)
        github_link = graphene.String(required=False)
        tags = models.graphene.String()
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


schema = graphene.schema(query=Query, mutation=Mutation)
