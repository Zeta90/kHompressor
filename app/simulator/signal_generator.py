from app.simulator.physics import Physics
import math


class SignalGenerator:
    x = []
    v = []
    y = []
    a = []

    TIME_MULTIPLIER = 0
    SAMPLES = 0
    TOTAL_SIMULATION_TIME = 0
    EFFECTIVE_SIMULATION_TIME = 0

    def basic_digital_signals(self, signal, offset_time, s_on_time, s_off_time, amp):
        i = 0
        j=0
        with_down_state = True
        stepped = False
        triangle = False

        curr_point = 0
        offset_samples = offset_time / self.delta_t

        counter = 0
        amplif = 0
        if signal == 1:
            with_down_state = False
        elif signal == 3:#3
            stepped = True
        elif signal ==4:#4
            triangle = True

        while counter < self.TOTAL_SIMULATION_TIME:
            if counter == 0:
                curr_point += offset_time
                for i in range(int(offset_time / self.delta_t)):
                    self.y.append(0)
                counter += 1
            else:
                amplif = amp
                curr_point += s_on_time
                for i in range(int(s_on_time / self.delta_t)):
                    if stepped == True:
                        amplif = counter
                    elif triangle == True:
                        amplif = i
                    self.y.append(amplif)

                if with_down_state == True:
                    amplif = 0
                    if stepped == True:
                        amplif = counter
                    elif triangle == True:
                        amplif = 0
                        
                    curr_point += s_off_time
                    for i in range(int(s_off_time / self.delta_t)):
                        self.y.append(amplif)

                if curr_point < self.TOTAL_SIMULATION_TIME:
                    counter += 1
                else:
                    break


        self.y = self.y[:self.SAMPLES]

        while j < self.SAMPLES:
            if j < offset_samples - 1:
                x = j * self.delta_t
                v = 0
                a = 0
                self.x.append(x)
                self.v.append(v)
                self.a.append(a)
                j += 1
            else:
                x = j * self.delta_t
                v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                a = self.physics.step_a(v, self.TIME_MULTIPLIER)
                self.x.append(x)
                self.v.append(v)
                self.a.append(a)
                j += 1
        return self.x, self.y, self.v, self.a

    def __init__(self, delta_t, samples):
        self.delta_t = delta_t
        self.SAMPLES = samples
        self.TOTAL_SIMULATION_TIME = self.SAMPLES * self.delta_t
        self.TIME_MULTIPLIER = samples / self.TOTAL_SIMULATION_TIME

        self.physics = Physics(delta_t, self.TIME_MULTIPLIER)

    def generate_signal_values(self, signal_type, signal_data):
        self.y = []  # * self.SAMPLES
        self.v = [0]
        self.a = [0]
        self.x = [0]
        if (signal_type) == "1":  #   STEP  1
            offset_time = float(signal_data[0])
            s_on_time = self.TOTAL_SIMULATION_TIME - offset_time
            s_off_time = 0
            amp = float(signal_data[1])
            self.x, self.y, self.v, self.a = self.basic_digital_signals(
                1, offset_time, s_on_time, s_off_time, amp
            )
        elif (signal_type) == "3":  #   SQUARE  2
            offset_time = float(signal_data[0])
            s_on_time = float(signal_data[1])
            s_off_time = float(signal_data[2])
            amp = float(signal_data[3])
            self.x, self.y, self.v, self.a = self.basic_digital_signals(
                2,offset_time, s_on_time, s_off_time, amp
            )
        elif (signal_type) == "2":  #   STEPPED    3
            offset_time = float(signal_data[0])
            s_on_time = float(signal_data[1])
            s_off_time = float(signal_data[2])
            amp = float(signal_data[3])
            self.x, self.y, self.v, self.a = self.basic_digital_signals(
                2,offset_time, s_on_time, s_off_time, amp
            )
        return self.x, self.y, self.v, self.a

    def square(self, offset_time, s_on_time, s_off_time, amp):
        i = 0
        j = 0
        up = False
        busy = False
        n_steps = int(self.TIME_MULTIPLIER * s_on_time)
        p_up = []
        p_down = []
        curr_point = 0
        offset_samples = offset_time / self.delta_t

        counter = 0

        while counter < self.TOTAL_SIMULATION_TIME:
            if counter == 0:
                curr_point += offset_time
                p_down.append(curr_point)
                for i in range(int(offset_time / self.delta_t)):
                    self.y.append(0)
                counter += 1
            else:
                curr_point += s_on_time
                p_up.append(curr_point)
                for i in range(int(s_on_time / self.delta_t)):
                    self.y.append(amp)

                curr_point += s_off_time
                p_down.append(curr_point)
                for i in range(int(s_off_time / self.delta_t)):
                    self.y.append(0)

                if curr_point < self.TOTAL_SIMULATION_TIME:
                    counter += 1
                else:
                    break
        self.y = self.y[:200]
        while i < self.SAMPLES:

            if i < offset_samples - 1:
                x = i * self.delta_t
                v = 0
                a = 0
                self.x.append(x)
                self.v.append(v)
                self.a.append(a)
                i += 1
            else:
                x = i * self.delta_t
                v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                a = self.physics.step_a(v, self.TIME_MULTIPLIER)
                self.x.append(x)
                self.v.append(v)
                self.a.append(a)
                i += 1
            j += 1
        print((self.x))
        print((self.y))
        return self.x, self.y, self.v, self.a

    def step(self, offset_time, amp):
        offset_samples = offset_time / self.delta_t
        i = 0
        for i in range(self.SAMPLES):
            if i < (offset_samples - 1):
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
        return self.x, self.y, self.v, self.a
