import math
class Simmaths:
    def calc_response_angle_sbs(signal,response,x, long):
        #print(response)
        #print(x)
        print('----->>>>')
        ilen = len(response)
        theta = []
        y = []  
        for i in range(ilen):
            #   |\
            #   | \
            # H |  \  L
            #   |   \
            #   |____\
            #      D  *
            D = x[i]-response[i]

            ang_theta = math.sin(D/long)
            print(D)
            # if ((dy != -1) and (dy != 1)):
            #     ang_theta = math.asin(dy)


            # else:
            #     if(dy < -1):
            #         ang_theta = -90*math.pi/180
            #     else:
            #         ang_theta = 90*math.pi/180

            # print(x[i])
            # print(response[i])
            # print(ang_theta)
            # print(dy)
            # print('-----')
            theta.append(ang_theta)
            y.append(long * math.cos(ang_theta))
        return [theta, y]