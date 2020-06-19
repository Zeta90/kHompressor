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
            dy = (x[i]-response[i])/long
            if ((dy > -1) and (dy < 1)):
                ang_theta = math.asin(dy)
                # print(x[i])
                # print(response[i])
                # print('-----')
            else:
                if(dy < -1):
                    ang_theta = -90*math.pi/180
                else:
                    ang_theta = 90*math.pi/180 
            theta.append(ang_theta)
            y.append(long * math.cos(ang_theta))
        return [theta, y]