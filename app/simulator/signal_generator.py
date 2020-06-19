from khompressor.app.simulator.physics import Physics

class SignalGenerator:
    x = []
    v = []
    t = []

    delta_t = 0
    acceleration = 0
    braking = 0

    def __init__(self,delta_t,acceleration, braking):
        self.delta_t = delta_t
        self.acceleration = acceleration
        self.braking = braking
        self.physics = Physics(delta_t,acceleration,braking)

    def generate_signal_values(self,smpls):
        self.x = [0]
        self.v = [0]
        self.t = []
        for i in range(smpls):
            if(i<(smpls/10)):
                x, v = self.physics.Right(i,self.delta_t)
                t = i * self.delta_t
                self.x.append(x)
                self.v.append(v)
                self.t.append(t)
            elif(i<(smpls-1)):
                x, v = self.physics.Middle(i,self.delta_t)
                t = i * self.delta_t
                self.x.append(x)
                self.v.append(v)
                self.t.append(t)
        print((self.x))
        return self.x, self.t, self.v