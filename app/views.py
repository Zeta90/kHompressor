from django.http import HttpResponse
from django.template import Template, Context

 
def simulator(request):
      simulator = open('app/views/simulator.html')

      plt=Template(simulator.read())
      simulator.close()
      ctx= Context()
      
      sim = plt.render(ctx)
      return HttpResponse(sim)