
class Physics:
    #   Velocity
    ACCELERATION_MOV = 0    
    ACCELERATION_BRK = 0
    VELOCITY_MAX = 25

    delta_t = 0

    #   trolley
    trolley_velocity = 0.0
    trolley_x = 0.0

    def __init__(self, delta_t,acceleration,braking):
        self.delta_t = delta_t
        self.ACCELERATION_MOV = acceleration
        self.ACCELERATION_BRK = braking

    def Right(self, n,dt):
        delta_t =  dt
        trolley_velocity = self.trolley_velocity
        trolley_x = self.trolley_x

        if trolley_velocity < self.VELOCITY_MAX:
            trolley_x = float(
                (trolley_x)
                + (trolley_velocity * delta_t)
                + (0.5 * float(self.ACCELERATION_MOV) * (delta_t ** 2.0))
            )
            trolley_velocity = trolley_velocity + (self.ACCELERATION_MOV * delta_t)
            # print("V1: " + str(self.velocity))
        else:
            trolley_x = float((trolley_x) + (trolley_velocity * delta_t))
            trolley_velocity = self.VELOCITY_MAX
            # print("V2: " + str(self.velocity))

        self.delta_t = delta_t
        self.trolley_x = trolley_x
        self.trolley_velocity = trolley_velocity

        return trolley_x, trolley_velocity

    def Middle(self, n,dt):
        delta_t =  dt
        trolley_velocity = self.trolley_velocity
        trolley_x = self.trolley_x


        if trolley_velocity < self.VELOCITY_MAX:
            trolley_x = float(
                (trolley_x)
                + (trolley_velocity * delta_t)
                - (0.5 * float(self.ACCELERATION_BRK) * (delta_t ** 2.0))
            )
            trolley_velocity = trolley_velocity - (self.ACCELERATION_BRK * delta_t)
            if trolley_velocity < 0:
                trolley_velocity = 0
            # print("B- V1: " + str(self.velocity))
        else:
            trolley_x = float((trolley_x) - (trolley_velocity * delta_t))
            trolley_velocity = trolley_velocity - (self.ACCELERATION_BRK * delta_t)
            # print("B- V2: " + str(self.velocity))


        # if trolley_velocity > -self.VELOCITY_MAX:
        #     trolley_x = float(
        #         (trolley_x)
        #         + (trolley_velocity * delta_t)
        #         + (0.5 * float(self.ACCELERATION_BRK) * (delta_t ** 2.0))
        #     )
        #     trolley_velocity = trolley_velocity + (self.ACCELERATION_BRK * delta_t)
        #     if trolley_velocity > 0:
        #         trolley_velocity = 0
        #     # print("B- V-1: " + str(self.velocity))
        # else:
        #     trolley_x = float((trolley_x) + (trolley_velocity * delta_t))
        #     trolley_velocity = trolley_velocity + (self.ACCELERATION_BRK * delta_t)
        #     # print("B- V-2: " + str(self.velocity))

        self.delta_t = delta_t
        self.trolley_x = trolley_x
        self.trolley_velocity = trolley_velocity
        
        return trolley_x, trolley_velocity
