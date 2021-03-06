from django.http import HttpResponse
from app.simulator.signal_generator import SignalGenerator
from app.simulator.pylsa import Pylsa
from app.simulator.fourier import Fourier
from app.simulator.simmaths import Simmaths
import numpy as np
import json
import math
from django.views.decorators.csrf import csrf_exempt

SAMPLES = 200


class SimulatorController:
    def run(self,delta_t):
        self.SAMPLES = 200
        self.SYSTEM_DELTA_T = float(delta_t)
        self.system_acc = 0
        self.system_braking = 0
        self.system_damping = 0
        self.system_long = 0

        #self.system_samplingF = delta_t * SAMPLES

        self.sim_time = []
        self.sim_y = []
        self.sim_velocity = []
        self.sim_acceleration = []

        self.sim_static_output = []
        self.sim_static_spectrum = []
        self.sim_static_freqs = []

        self.sim_static_optimal_spectrum = []

        self.fourier = None


sController = SimulatorController()


def calculate_optimus_static():
    # print(222)
    system_static_spectrum = [[], []]
    # print(1125)
    freq = np.arange(0, (SAMPLES / 2)) * 0.1
    fourier = Fourier()
    for i in range(int(SAMPLES)):
        if i == 0 or i == 1:
            system_static_spectrum[0].append([0])
            system_static_spectrum[1].append(freq.tolist())
            # print(system_static_spectrum)
        else:
            # print('->>')
            # print(system_static_spectrum)
            system_y_step = sController.sim_static_output[:i]
            # print(system_y_step)

            sim_static_optimal_spectrum = fourier.frequecies_spectrum(
                system_y_step, sController.system_samplingF
            )
            # print(sController.sim_static_optimal_spectrum)
            fft_amp = abs(sim_static_optimal_spectrum[0])

            # fft_freq = (sController.sim_static_optimal_spectrum[1]).tolist()
            system_static_spectrum[0].append(list(fft_amp))
            # print(list(fft_amp))
            # system_static_spectrum[0][i]=(fft_amp)
            # print(fft_amp)
            # system_static_spectrum[1][i]=(fft_freq)
            # sController.sim_static_spectrum=sController.sim_static_spectrum.astype('float64')
            # print(fft_amp)
            # print(fft_freq)
    # print(system_static_spectrum[0][:2])
    # print(sController.sim_static_optimal_spectrum)
    triangle = Simmaths.calc_response_angle_sbs(
        sController.sim_y,
        sController.sim_static_output,
        sController.sim_y,
        sController.system_long,
    )
    sgnl = [
        json.dumps(
            [
                sController.sim_static_output,
                sController.sim_time,
                system_static_spectrum[0],
                sController.sim_static_freqs,
                triangle,
            ]
        )
    ]
    return sgnl


@csrf_exempt
def AJAX_generate_signal(request):
    signal_type = request.POST.get("signal_type")
    signal_data = request.POST.get("signal_data")
    signal_data = json.loads(signal_data)
    # system_delta_t = float(request.POST.get("delta_t"))
    # system_damping = float(request.POST.get("system_damping"))
    # system_acc = float(request.POST.get("system_acc"))
    # system_long = float(request.POST.get("system_long"))
    # system_braking = float(request.POST.get("system_braking"))

    sController.run(0.1)

    signal = SignalGenerator(sController.SYSTEM_DELTA_T, sController.SAMPLES)
    system_t, system_y, system_v,system_a = signal.generate_signal_values(signal_type, signal_data)

    sController.sim_time = system_t
    sController.sim_y = system_y
    sController.sim_velocity = system_v
    sController.sim_acceleration = system_a
    sgnl = [json.dumps([system_t, system_y, system_v,system_a])]
    # print(sgnl)
    signal = None
    return HttpResponse(sgnl)


# @csrf_exempt
# def AJAX_static_optimal_input(request):
#     # print(sController.sim_input)
#     optimal_static_spectrum = calculate_optimus_static()
#     # print(optimal_static_spectrum)
#     return HttpResponse(optimal_static_spectrum)


# @csrf_exempt
# def AJAX_static_process_input(request):
#     # print(sController.sim_time)
#     # print(len(sController.sim_time))
#     LinearSimulation = Pylsa(sController.system_delta_t)
#     w2 = 9.81 / sController.system_long
#     LinearSimulation.transferFunction_standard(
#         math.sqrt(w2), sController.system_damping, 1
#     )
#     response = LinearSimulation.linear_simulation(
#         sController.sim_y, sController.sim_time, sController.system_delta_t, SAMPLES
#     )
#     sController.sim_static_output = response
#     # print(response)

#     sController.fourier = Fourier()
#     sController.sim_static_spectrum = sController.fourier.frequecies_spectrum(
#         response, sController.system_samplingF
#     )
#     # print(sController.sim_static_spectrum)
#     fft_amp = abs(sController.sim_static_spectrum[0]).tolist()
#     fft_freq = (sController.sim_static_spectrum[1]).tolist()
#     # sController.sim_static_spectrum=sController.sim_static_spectrum.astype('float64')
#     # print(fft_amp)
#     # print(fft_freq)

#     sController.sim_static_freqs = fft_freq
#     sgnl = [json.dumps([response, sController.sim_time, fft_amp, fft_freq])]

#     # print(sgnl)
#     return HttpResponse(sgnl)














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
