from app.simulator.physics import Physics


class SignalGenerator:
    x = []
    v = []
    y = []
    a = []

    TIME_MULTIPLIER = 0
    SAMPLES = 0
    TOTAL_SIMULATION_TIME = 0
    EFFECTIVE_SIMULATION_TIME = 0

    delta_t = 0
    acceleration = 0
    braking = 0

    def __init__(self, delta_t, samples):
        self.delta_t = delta_t
        self.SAMPLES = samples
        self.TOTAL_SIMULATION_TIME = self.SAMPLES * self.delta_t
        self.TIME_MULTIPLIER = samples / self.TOTAL_SIMULATION_TIME

        self.physics = Physics(delta_t, self.TIME_MULTIPLIER)

    def generate_signal_values(self, signal_type, signal_data):
        self.y = [0]
        self.v = [0]
        self.a = [0]
        self.x = []
        if (signal_type) == "1":
            offset_samples = float(signal_data[0]) / self.delta_t
            offset_time = float(signal_data[0])
            amp = float(signal_data[1])
            self.x, self.y, self.v, self.a = self.step(offset_time, offset_samples, amp)
        elif (signal_type) == "2":
            offset_samples = float(signal_data[0]) / self.delta_t
            offset_time = float(signal_data[0])
            s_on_time = float(signal_data[1])
            s_off_time = float(signal_data[2])
            amp = float(signal_data[3])
            self.x, self.y, self.v, self.a = self.square(
                offset_time, offset_samples, s_on_time, s_off_time, amp
            )
            # for i in range(samples):
            #     if i < (t0):
            #         x, v = self.physics.Right(i, self.delta_t)
            #         x *= gain
            #         v *= gain
            #         t = i * self.delta_t
            #         self.x.append(x)
            #         self.v.append(v)
            #         self.t.append(t)
            #     elif i < (samples - 1):
            #         x, v = self.physics.Middle(i, self.delta_t)
            #         x *= gain
            #         v *= gain
            #         self.x.append(x)
            #         self.v.append(v)
            #         self.t.append(t)
            # print((self.t))
        return self.x, self.y, self.v, self.a

    def square(self, offset_time, offset_samples, s_on_time, s_off_time, amp):
        i = 0
        up = false
        for i in range(self.SAMPLES):
            if i < (offset_samples):
                x = i * self.delta_t
                y = 0
                v = 0
                a = 0
                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)
            elif i < (self.SAMPLES - 1):
                j = i-offset_samples
                if (j % s_on_time) == 0:
                    up = True
                elif (j % s_off_time) == 0:
                    up = False
                
            if up == True:
                x = (i) * self.delta_t
                y = amp
                v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                a = self.physics.step_a(v, self.TIME_MULTIPLIER)
            else:
                x = (i) * self.delta_t
                y = 0
                v = 0
                a = self.physics.step_a(v, self.TIME_MULTIPLIER)

                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)
        self.x.append(self.TOTAL_SIMULATION_TIME)
        # print((self.t))
        return self.x, self.y, self.v, self.a

    def step(self, offset_time, offset_samples, amp):
        print("****")
        print(offset_samples)
        i = 0
        for i in range(self.SAMPLES):
            if i < (offset_samples):
                x = i * self.delta_t
                y = 0
                v = 0
                a = 0
                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)
            elif i < (self.SAMPLES - 1):
                x = (i) * self.delta_t
                y = amp
                v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                a = self.physics.step_a(v, self.TIME_MULTIPLIER)
                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)
        self.x.append(self.TOTAL_SIMULATION_TIME)
        # print((self.t))
        return self.x, self.y, self.v, self.a
