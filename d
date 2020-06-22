
    def square(self, offset_time, offset_samples, s_on_time, s_off_time, amp):
        i = 0
        j = 0
        up = True
        busy = False
        n_steps = int(self.TIME_MULTIPLIER * s_on_time)
        p_up =[]
        p_down = []
        curr_point = offset_time

        while i<self.TOTAL_SIMULATION_TIME:
            curr_point += s_on_time * i
            p_up.append(curr_point)
            curr_point += s_off_time * i
            p_down.append(curr_point)
            i+=1
            
        i=0
        while (i<self.SAMPLES):
            if(i < offset_samples):
                x = i * self.delta_t
                y = 0
                v = 0
                a = 0
                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)

            else:
                j = i-offset_samples
                if j in p_up:
                    if up == True:
                        up = False
                    else:
                        up = True
                elif j in p_down:
                    if up == False:
                        up = True
                    else:
                        up = False

                if up == True:
                    #print('t: ' + str((i) * self.delta_t) + ' up: ' + str(up) + ' up: ' + str(c_cicles))
                    x = (i) * self.delta_t
                    y = amp
                    v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                    a = self.physics.step_a(v, self.TIME_MULTIPLIER)
                    self.x.append(x)
                    self.y.append(y)
                    self.v.append(v)
                    self.a.append(a)
                else:
                    #print('t: ' + str((i) * self.delta_t) + ' up: ' + str(up) + ' cicle: ' + str(c_cicles) )
                    x = (i) * self.delta_t
                    y = 0
                    v = 0
                    a = self.physics.step_a(v, self.TIME_MULTIPLIER)
                    self.x.append(x)
                    self.y.append(y)
                    self.v.append(v)
                    self.a.append(a)
            i+=1
        self.x.append(self.TOTAL_SIMULATION_TIME)
        # print((self.t))
        return self.x, self.y, self.v, self.a
























        for i in range(p_up):
            for j in range (s_on_time/self.delta_t):
                if()





        while (i<self.SAMPLES):
            
            if(i < offset_samples-1):
                x = i * self.delta_t
                y = 0
                v = 0
                a = 0
                round(x,2)
                self.x.append(x)
                self.y.append(y)
                self.v.append(v)
                self.a.append(a)
                i+=1
            else:
                if(i>100):
                     print('->')
                t_comp = i * self.delta_t
                round(t_comp,2)
                
                for ii in range(len(p_up)):
                    same_time = math.isclose(t_comp + self.delta_t, p_up[ii], rel_tol=0.01)
                    print(same_time)
                    if(same_time == True):
                        if up == True:
                            up = False
                        else:
                            up = True

                print(t_comp)
                print(p_up)

                if up == True:
                    x = i * self.delta_t
                    y = amp
                    v = self.physics.step_v(x, self.TIME_MULTIPLIER)
                    a = self.physics.step_a(v, self.TIME_MULTIPLIER)

                    self.x.append(x)
                    self.y.append(y)
                    self.v.append(v)
                    self.a.append(a)
                    i+=1
                else:
                    x = i * self.delta_t
                    y = 0
                    v = 0
                    a = self.physics.step_a(v, self.TIME_MULTIPLIER)

                    self.x.append(x)
                    self.y.append(y)
                    self.v.append(v)
                    self.a.append(a)
                    i+=1
                j+=1 
                print(t_comp)
                print(p_up)
        return self.x, self.y, self.v, self.a