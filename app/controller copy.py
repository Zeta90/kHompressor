from django.http import HttpResponse
from khompressor.app.simulator.signal_generator import SignalGenerator
from khompressor.app.simulator.pylsa import Pylsa
from khompressor.app.simulator.fourier import Fourier
import numpy as np
import json
import math
from django.views.decorators.csrf import csrf_exempt 
z
SAMPLES = 200

class SimulatorController:
    def run(self, delta_t,system_acc,system_braking,system_damping,system_long):
        self.system_delta_t = delta_t
        self.system_acc =system_acc
        self.system_braking = system_braking
        self.system_damping = system_damping
        self.system_long = system_long
        
        self.system_samplingF = delta_t*SAMPLES
        
        self.sim_time = []
        self.sim_input = []
        self.sim_velocity = []
        
        self.sim_static_output = []
        self.sim_static_spectrum = []
        self.sim_static_optimal_spectrum = []
        
        self.fourier = None
        
sController = SimulatorController()

def calculate_optimus_static():
    #print(222)
    system_static_spectrum = [[None]*int(SAMPLES),[None]]
    #print(1125)
    freq = []
    out=0
    freq=0
    fourier= Fourier()
    for i in range(int(SAMPLES)):
        if i==0:
            system_y_step = [sController.sim_input[0],0]
            ssp_out,ssp_freq=(sController.fourier.frequecies_spectrum(system_y_step,sController.system_samplingF))
            system_static_spectrum[0][i]=(list(abs(ssp_out)))
            system_static_spectrum[1]=(list(ssp_freq))
            #print(system_static_spectrum)
        else:
            #print('->>')
            #print(system_static_spectrum)
            system_y_step = [sController.sim_input[:i]]
                        

            sController.sim_static_optimal_spectrum=fourier.frequecies_spectrum(sController.sim_input,sController.system_samplingF)
            #print(sController.sim_static_optimal_spectrum)
            fft_amp = (abs(sController.sim_static_optimal_spectrum[0]).tolist())
            fft_freq = (sController.sim_static_optimal_spectrum[1]).tolist()
            system_static_spectrum[0][i]=(fft_amp)
            #print(fft_amp)
            #system_static_spectrum[1][i]=(fft_freq)
            #sController.sim_static_spectrum=sController.sim_static_spectrum.astype('float64') 
            #print(fft_amp)
            #print(fft_freq)
    print(system_static_spectrum[0][:2])
    #print(sController.sim_static_optimal_spectrum)
    sgnl = [json.dumps([sController.sim_static_output,sController.sim_time,system_static_spectrum[0],system_static_spectrum[1]])]
    return sgnl
        
@csrf_exempt
def AJAX_generate_signal(request):
    system_delta_t = float(request.POST.get('delta_t'))
    system_damping = float(request.POST.get('system_damping'))
    system_acc = float(request.POST.get('system_acc'))
    system_long = float(request.POST.get('system_long'))
    system_braking = float(request.POST.get('system_braking'))
    
    sController.run(system_delta_t,system_acc,system_braking,system_damping,system_long)

    signal = SignalGenerator(system_delta_t,system_acc,system_braking)
    system_y,system_t,system_v = signal.generate_signal_values(SAMPLES)
    
    sController.sim_time = system_t
    sController.sim_input = system_y
    sController.sim_velocity = system_v

    sgnl = [json.dumps([system_y,system_t,system_v])]
    #print(sgnl)
    return HttpResponse(sgnl)

@csrf_exempt
def AJAX_static_optimal_input(request):
    #print(sController.sim_input)
    optimal_static_spectrum = calculate_optimus_static()
    #print(optimal_static_spectrum)
    return HttpResponse(optimal_static_spectrum)

@csrf_exempt
def AJAX_static_process_input(request):
    #print(111)
    #print(sController.system_long)
    LinearSimulation = Pylsa(sController.system_delta_t)
    LinearSimulation.transferFunction_standard(math.sqrt(9.81 / sController.system_long), sController.system_damping, 1)
    response = LinearSimulation.linear_simulation(sController.sim_input, sController.sim_time, sController.system_delta_t, SAMPLES)
    sController.sim_static_output = response
    
    sController.fourier = Fourier()
    sController.sim_static_spectrum=sController.fourier.frequecies_spectrum(sController.sim_input,sController.system_samplingF)
    #print(sController.sim_static_spectrum)
    fft_amp = (abs(sController.sim_static_spectrum[0]).tolist())
    fft_freq = (sController.sim_static_spectrum[1]).tolist()
    #sController.sim_static_spectrum=sController.sim_static_spectrum.astype('float64') 
    #print(fft_amp)
    #print(fft_freq)

    sgnl = [json.dumps([response,sController.sim_time,fft_amp,fft_freq])]
    
    
    #print(sgnl)
    return HttpResponse(sgnl)
    



# @csrf_exempt
# def AJAX_process_signal2(request):
#     system_delta_t = float(request.POST.get('delta_t'))
#     system_damping = float(request.POST.get('system_damping'))
#     system_acc = float(request.POST.get('system_acc'))
#     system_long = float(request.POST.get('system_long'))
#     system_braking = float(request.POST.get('system_braking'))

#     print(system_delta_t)
#     signal = SignalGenerator(system_delta_t,system_acc,system_braking)
#     system_y,system_t,system_v = signal.GenerateSignalValues()

#     #time = json.dumps(system_t)

#     LinearSimulation = Pylsa(system_delta_t)

#     LinearSimulation.transferFunction_standard(math.sqrt(9.81 / system_long), system_damping, 1)

#     response = LinearSimulation.linear_simulation(system_y, system_t, system_delta_t, 2000)

#     fourier = Fourier()
   
#     static_spectrum=fourier.frequecies_spectrum(system_y)
    
#     optimal_static_spectrum = calculate_optimus_static(system_y,fourier)
    
#     # data_np = np.array(static_spectrum)
#     # data_list = data_np.tolist()
#     # static_spectrum == data_list
#     print('>>>>')
#     #print(optimal_static_spectrum)

#     input = json.dumps([system_y,system_t,system_v,response,static_spectrum[0].tolist(),static_spectrum[1].tolist()
#                         , optimal_static_spectrum[0].tolist(),optimal_static_spectrum[1].tolist()
#                         ])
#     return HttpResponse(input)
    
