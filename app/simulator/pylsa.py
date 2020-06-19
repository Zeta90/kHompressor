import math
class Pylsa:
    def __init__(self, delta_t):
        self.sys_Wn = 0
        self.sys_Zeta = 0
        self.sys_K = 0
        self.isValidTF = False
        self.delta_t = delta_t

        self.sim_time = []
        self.sim_discretized_u_signal = []
        self.discretized_y_response = []
        self.step_input = []
        self.step_output = 0

    def transferFunction_standard(self,Wn, Zeta, K):
        if (Wn <= 0 or K <= 0 or Zeta >= 1 or Zeta <= 0):
            self.sys_Wn = 0
            self.sys_Zeta = 0
            self.sys_K = 0
            self.isValidTF = False
        else:
            self.sys_Wn = Wn
            self.sys_Zeta = Zeta
            self.sys_K = K
            self.isValidTF = True

    def secondOrder_step_response(self,u, t):
        damping = math.sqrt(1 - (self.sys_Zeta ** 2))

        so_step_response = u - u * self.sys_K* ((math.e ** (-self.sys_Zeta * self.sys_Wn * t)) * (math.cos(self.sys_Wn * damping * t) + (self.sys_Zeta / damping)
                * math.sin(self.sys_Wn * damping * t)))
        return so_step_response

    def linear_simulation(self, input, time, delta_time,sample_len):
        if (self.isValidTF == True):
            if (not(time[0] >= time[1])):
                self.sim_time = time
                self.sim_discretized_u_signal = input
                self.delta_t = delta_time
                self.input_convolution(sample_len)

                return self.discretized_y_response

    def linear_simulation_StepByStep(self,input, delta_time):
        
        self.step_output = []
        u1 = 0
        u0 = 0
        u = 0

        self.step_input.append(input)
        input_n = len(self.step_input)

        for i in range(input_n):
            u1 = self.step_input[i]
            u = u1

            if(i>0):
                u0 = self.step_input[i - 1]

                if(u1 != u0):
                    u = (u1 - u0)
                    self.step_output += self.secondOrder_step_response(u, (input_n - i) * delta_time)
            else:
                self.step_output += self.secondOrder_step_response(u, (input_n - i) * delta_time)
            
        return self.step_output

    def input_convolution(self, n_iterations):
        simulationTime = self.delta_t
        y0 = []
        y = []

        for i in range(n_iterations):
            u = 0
            u1 = self.sim_discretized_u_signal[i]
            u = u1

            if (i > 0):
                u0 = self.sim_discretized_u_signal[i - 1]
                if (u1 != u0):

                    u = u1 - u0
                    for j in range(n_iterations):
                        if (not(j < i)):
                            t = (j - i) * self.delta_t
                            y[j] += (self.secondOrder_step_response(u, t))
            else:
                for j in range(n_iterations):
                    t = (j - i) * self.delta_t
                    y.append(self.secondOrder_step_response(u, t))

        self.discretized_y_response = y