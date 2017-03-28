from rest_framework import serializers,viewsets
from database.models import News
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework import status

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
class NewsViewSet(viewsets.ModelViewSet):
    serializer_class = NewsSerializer
    permission_classes = (IsAuthenticated,)
    #queryset = News.objects.all()
    @list_route(methods=['delete',])
    def deletes(self, request, **kwargs):
        ids = request.GET['ids'].split(',')
        News.objects.filter(id__in=ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)	
    def get_queryset(self):
        if not 'search' in self.request.GET:
            ft = News.objects.all()
        else:
            ft = News.objects.filter(title__contains=self.request.GET['search'])
        return ft.order_by('-create_time')
		
class UserViewSet(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {
            'userid':request.user.id,
            'username':request.user.username,
        }
        return Response(content)